import { connectToDatabase } from "$lib/server/mongodb";
import { excursionSchema } from "$lib/schemas/excursionSchema";
import { json } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";
import { excursionSteps } from "$lib/components/admin/fields/excursions";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name) {
    return excursionSteps.some((step) =>
        step.fields.some(
            (field) => field.name === name && field.localized === true
        )
    );
}

export async function POST({ request }) {
    try {
        const body = await request.json();
        console.log("Received data:", body);

        const parsed = excursionSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }
        const data = parsed.data;

        const allFields = flattenFields(excursionSteps);

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

        if (typeof mainDoc.slug === "string") {
            mainDoc.slug = mainDoc.slug.trim().toLowerCase();
        } else {
            return json({ error: "Slug обязателен" }, { status: 400 });
        }

        mainDoc.createdAt = new Date();
        mainDoc.rating = 0;
        mainDoc.reviewsCount = 0;

        const db = await connectToDatabase();
        const exists = await db
            .collection("excursions")
            .findOne({ slug: mainDoc.slug });
        if (exists) {
            return json(
                { error: "Такой slug уже существует" },
                { status: 409 }
            );
        }

        await db.collection("excursions").insertOne(mainDoc);

        const localizedFields = allFields.filter((f) =>
            isLocalizedField(f.name)
        );

        console.log("====================================");
        console.log("Localized fields:", localizedFields);
        console.log("====================================");

        const translations = SUPPORTED_LANGUAGES.map((lang) => {
            const translation = { itemSlug: mainDoc.slug, lang };

            for (const field of localizedFields) {
                // Берем только имя поля до точки (если вдруг было "description.ru")
                const fieldName = field.name.includes(".")
                    ? field.name.split(".")[0]
                    : field.name;

                // Значение для текущего языка
                const val = data[fieldName]?.[lang];

                // Если undefined/null → дефолт
                if (val !== undefined && val !== null) {
                    translation[fieldName] = val;
                } else if (
                    field.default &&
                    typeof field.default === "object" &&
                    field.default[lang] !== undefined
                ) {
                    translation[fieldName] = field.default[lang];
                } else {
                    // Пустой массив или строка в зависимости от типа дефолта
                    translation[fieldName] = Array.isArray(field.default)
                        ? []
                        : "";
                }
            }

            return translation;
        });

        await db.collection("excursions_translations").insertMany(translations);

        await redis.del("excursions");

        return json({ success: true, slug: mainDoc.slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании экскурсии:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
