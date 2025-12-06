import { connectToDatabase } from "$lib/server/db/mongodb";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
import { flattenFields } from "$lib/server/services/shared/flattenFields";
import { isLocalizedField } from "$lib/server/services/shared/isLocalizedField";
import { invalidateCache } from "$lib/server/cache/invalidateAfterChange.js";

/**
 * Универсальная функция для обновления элемента
 */
export async function updateItemInDB(slug, data, type, steps) {
    const db = await connectToDatabase();
    const allFields = flattenFields(steps);

    const localizedFields = allFields.filter((f) =>
        isLocalizedField(f.name, steps)
    );

    // Основной документ (без локализованных полей)
    const mainDoc = { ...data };
    for (const field of localizedFields) {
        delete mainDoc[field.name];
    }

    if (data.slug && data.slug !== slug) {
        mainDoc.slug = data.slug.trim().toLowerCase();
    }

    // mainDoc — объект с полями для обновления
    if (mainDoc.publishDate && typeof mainDoc.publishDate === "string") {
        mainDoc.publishDate = new Date(mainDoc.publishDate);
    }
    if (mainDoc.discountEnd && typeof mainDoc.discountEnd === "string") {
        mainDoc.discountEnd = new Date(mainDoc.discountEnd);
    }
    await db.collection(type).updateOne(
        { slug },
        {
            $set: {
                ...mainDoc,
                updatedAt: new Date(),
            },
        }
    );

    // Обновляем переводы
    await db.collection(`${type}_translations`).deleteMany({ itemSlug: slug });

    const translations = SUPPORTED_LANGUAGES.map((lang) => {
        const t = { itemSlug: mainDoc.slug, lang };

        for (const field of localizedFields) {
            const value = data[field.name];

            if (Array.isArray(value) && field.type === "array") {
                // 🔹 content или аналогичные массивы локализованных объектов
                t[field.name] = value.map((item) => item?.[lang] || {});
            } else if (value && typeof value === "object") {
                // 🔹 обычные локализованные объекты (title, metaDescription и т.п.)
                t[field.name] = value[lang] ?? "";
            } else {
                // 🔹 fallback
                t[field.name] = Array.isArray(field.default) ? [] : "";
            }
        }

        return t;
    });

    await db.collection(`${type}_translations`).insertMany(translations);

    await invalidateCache(type, slug);

    return mainDoc.slug || slug;
}
