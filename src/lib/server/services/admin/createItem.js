import { connectToDatabase } from "$lib/server/db/mongodb";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
import { flattenFields } from "$lib/server/services/shared/flattenFields";
import { isLocalizedField } from "$lib/server/services/shared/isLocalizedField";
import { invalidateCache } from "$lib/server/cache/invalidateAfterChange.js";

/**
 * Универсальная функция для создания нового элемента
 * @param {Object} data - данные элемента
 * @param {String} type - имя основной коллекции
 * @param {Array} steps - массив шагов формы (для локализованных полей)
 */
export async function createItemInDB(data, type, steps) {
    const allFields = flattenFields(steps);

    // Основной документ (не локализованные поля)
    const mainDoc = {};
    for (const field of allFields) {
        if (!isLocalizedField(field.name, steps)) {
            mainDoc[field.name] = data[field.name] ?? field.default ?? null;
        }
    }

    if (typeof mainDoc.slug === "string") {
        mainDoc.slug = mainDoc.slug.trim().toLowerCase();
    } else {
        throw new Error("Slug обязателен");
    }

    mainDoc.createdAt = new Date();
    mainDoc.updatedAt = new Date();
    mainDoc.rating = 0;
    mainDoc.reviewsCount = 0;

    const db = await connectToDatabase();

    const exists = await db.collection(type).findOne({ slug: mainDoc.slug });
    if (exists) {
        throw new Error("Такой slug уже существует");
    }

    await db.collection(type).insertOne(mainDoc);

    // Локализованные поля
    const localizedFields = allFields.filter((f) =>
        isLocalizedField(f.name, steps)
    );

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

    await invalidateCache(type);
    return mainDoc.slug;
}
