import { connectToDatabase } from "$lib/server/mongodb";
import { carSchema } from "$lib/schemas/carSchema";
import { json } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";
import { carSteps } from "$lib/components/admin/fields/cars"; // шаги формы для машин
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name) {
    return carSteps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

export async function POST({ request }) {
    try {
        const body = await request.json();

        const parsed = carSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }
        const data = parsed.data;

        const allFields = flattenFields(carSteps);

        // Формируем основной документ (без локализации)
        const mainDoc = {};
        for (const field of allFields) {
            if (!isLocalizedField(field.name)) {
                if (
                    data[field.name] !== undefined &&
                    data[field.name] !== null
                ) {
                    mainDoc[field.name] = data[field.name];
                } else if (field.default !== undefined) {
                    mainDoc[field.name] = field.default;
                }
            }
        }

        // Нормализуем slug
        if (typeof mainDoc.slug === "string") {
            mainDoc.slug = mainDoc.slug.trim().toLowerCase();
        } else {
            return json({ error: "Slug обязателен" }, { status: 400 });
        }

        mainDoc.createdAt = new Date();
        mainDoc.rating = 0;
        mainDoc.reviewsCount = 0;

        const db = await connectToDatabase();

        // Проверка уникальности slug
        const exists = await db
            .collection("cars")
            .findOne({ slug: mainDoc.slug });
        if (exists) {
            return json(
                { error: "Такой slug уже существует" },
                { status: 409 }
            );
        }

        // Вставка в основную коллекцию
        await db.collection("cars").insertOne(mainDoc);

        // Локализованные поля
        const localizedFields = allFields.filter((f) =>
            isLocalizedField(f.name)
        );

        const translations = SUPPORTED_LANGUAGES.map((lang) => {
            const translation = { itemSlug: mainDoc.slug, lang };

            for (const field of localizedFields) {
                const fieldName = field.name.includes(".")
                    ? field.name.split(".")[0]
                    : field.name;
                const val = data[fieldName]?.[lang];

                if (val !== undefined && val !== null) {
                    translation[fieldName] = val;
                } else if (
                    field.default &&
                    typeof field.default === "object" &&
                    field.default[lang] !== undefined
                ) {
                    translation[fieldName] = field.default[lang];
                } else {
                    translation[fieldName] = Array.isArray(field.default)
                        ? []
                        : "";
                }
            }

            return translation;
        });

        await db.collection("cars_translations").insertMany(translations);

        await redis.del("cars");

        return json({ success: true, slug: mainDoc.slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании авто:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
