import { connectToDatabase } from "$lib/server/mongodb";
import { transferSchema } from "$lib/schemas/transferSchema";
import { json } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
import { transferSteps } from "$lib/components/admin/fields/transfers"; // шаги как у экскурсий

function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name) {
    return transferSteps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

export async function POST({ request }) {
    try {
        const body = await request.json();

        // ✅ Валидация с Zod
        const parsed = transferSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }

        const data = parsed.data;

        const allFields = flattenFields(transferSteps);

        // Основной документ — только не-локализованные поля
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

        if (typeof mainDoc.slug !== "string" || !mainDoc.slug.trim()) {
            return json({ error: "Slug обязателен" }, { status: 400 });
        }
        mainDoc.slug = mainDoc.slug.trim().toLowerCase();
        mainDoc.createdAt = new Date();
        mainDoc.rating = 0;
        mainDoc.reviewsCount = 0;

        const db = await connectToDatabase();

        // Проверка уникальности slug
        const exists = await db
            .collection("transfers")
            .findOne({ slug: mainDoc.slug });
        if (exists) {
            return json(
                { error: "Такой slug уже существует" },
                { status: 409 }
            );
        }

        // Вставляем основной документ
        await db.collection("transfers").insertOne(mainDoc);

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

        await db.collection("transfers_translations").insertMany(translations);

        // Очистка кеша
        await redis.del("transfers");

        return json({ success: true, slug: mainDoc.slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании трансфера:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
