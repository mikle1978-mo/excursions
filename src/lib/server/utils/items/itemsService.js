import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

/**
 * Вспомогательные функции
 */
function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name, steps) {
    return steps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

/**
 * Универсальная функция для создания нового элемента
 * @param {Object} data - данные элемента
 * @param {String} collectionName - имя основной коллекции
 * @param {Array} steps - массив шагов формы (для локализованных полей)
 */
export async function createItem(data, collectionName, steps) {
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
    mainDoc.rating = 0;
    mainDoc.reviewsCount = 0;

    const db = await connectToDatabase();

    const exists = await db
        .collection(collectionName)
        .findOne({ slug: mainDoc.slug });
    if (exists) {
        throw new Error("Такой slug уже существует");
    }

    await db.collection(collectionName).insertOne(mainDoc);

    // Локализованные поля
    const localizedFields = allFields.filter((f) =>
        isLocalizedField(f.name, steps)
    );

    const translations = SUPPORTED_LANGUAGES.map((lang) => {
        const t = { itemSlug: mainDoc.slug, lang };
        for (const field of localizedFields) {
            const val = data[field.name]?.[lang];
            if (val !== undefined && val !== null) {
                t[field.name] = val;
            } else if (field.default && field.default[lang] !== undefined) {
                t[field.name] = field.default[lang];
            } else {
                t[field.name] = Array.isArray(field.default) ? [] : "";
            }
        }
        return t;
    });

    await db
        .collection(`${collectionName}_translations`)
        .insertMany(translations);
    await redis.del(collectionName);

    return mainDoc.slug;
}

/**
 * Универсальная функция для получения элемента по slug
 */
export async function getItem(slug, collectionName) {
    const db = await connectToDatabase();
    const item = await db.collection(collectionName).findOne({ slug });
    const translation = await db
        .collection(`${collectionName}_translations`)
        .find({ itemSlug: slug })
        .toArray();
    return { item, translation };
}

/**
 * Универсальная функция для обновления элемента
 */
export async function updateItem(slug, data, collectionName, steps) {
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

    await db.collection(collectionName).updateOne({ slug }, { $set: mainDoc });

    // Обновляем переводы
    await db
        .collection(`${collectionName}_translations`)
        .deleteMany({ itemSlug: slug });

    const translations = SUPPORTED_LANGUAGES.map((lang) => {
        const t = { itemSlug: mainDoc.slug || slug, lang };
        for (const field of localizedFields) {
            const val = data[field.name]?.[lang];
            if (val !== undefined && val !== null) {
                t[field.name] = val;
            } else if (field.default && field.default[lang] !== undefined) {
                t[field.name] = field.default[lang];
            } else {
                t[field.name] = Array.isArray(field.default) ? [] : "";
            }
        }
        return t;
    });

    await db
        .collection(`${collectionName}_translations`)
        .insertMany(translations);
    await redis.del(collectionName);

    return mainDoc.slug || slug;
}

/**
 * Универсальная функция для удаления элемента
 */
export async function deleteItem(slug, collectionName) {
    const db = await connectToDatabase();
    await db.collection(collectionName).deleteOne({ slug });
    await db
        .collection(`${collectionName}_translations`)
        .deleteMany({ itemSlug: slug });
    await redis.del(collectionName);
    return true;
}
