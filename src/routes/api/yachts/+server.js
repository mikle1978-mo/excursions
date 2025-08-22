import { connectToDatabase } from "$lib/server/mongodb";
import { yachtSchema } from "$lib/schemas/yachtSchema";
import { json } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";
import { yachtSteps } from "$lib/components/admin/fields/yachts";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// вспомогательные функции
function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name) {
    return yachtSteps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

export async function POST({ request }) {
    try {
        const body = await request.json();

        // Валидация Zod
        const parsed = yachtSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }
        const data = parsed.data;

        const allFields = flattenFields(yachtSteps);

        // Основной документ (не-локализованные поля)
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
            .collection("yachts")
            .findOne({ slug: mainDoc.slug });
        if (exists) {
            return json(
                { error: "Такой slug уже существует" },
                { status: 409 }
            );
        }

        await db.collection("yachts").insertOne(mainDoc);

        // Локализованные поля
        const localizedFields = allFields.filter((f) =>
            isLocalizedField(f.name)
        );

        const translations = SUPPORTED_LANGUAGES.map((lang) => {
            const translation = { itemSlug: mainDoc.slug, lang };
            for (const field of localizedFields) {
                const val = data[field.name]?.[lang];
                if (val !== undefined && val !== null) {
                    translation[field.name] = val;
                } else if (field.default && field.default[lang] !== undefined) {
                    translation[field.name] = field.default[lang];
                } else {
                    translation[field.name] = Array.isArray(field.default)
                        ? []
                        : "";
                }
            }
            return translation;
        });

        await db.collection("yachts_translations").insertMany(translations);

        await redis.del("yachts");

        return json({ success: true, slug: mainDoc.slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании яхты:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
