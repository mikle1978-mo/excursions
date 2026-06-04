import { connectToDatabase } from "$lib/server/db/mongodb";
import { redis } from "$lib/server/db/redis";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

const CACHE_TTL_SECONDS = 5; // 5 минут по умолчанию

/**
 * Вспомогательные функции
 */
function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name, steps) {
    return steps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized),
    );
}

/**
 * Универсальная функция для создания нового элемента
 * @param {Object} data - данные элемента
 * @param {String} collectionName - имя основной коллекции
 * @param {Array} steps - массив шагов формы (для локализованных полей)
 */
export async function createItemInDB(data, collectionName, steps) {
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

    const exists = await db
        .collection(collectionName)
        .findOne({ slug: mainDoc.slug });
    if (exists) {
        throw new Error("Такой slug уже существует");
    }

    await db.collection(collectionName).insertOne(mainDoc);

    // Локализованные поля
    const localizedFields = allFields.filter((f) =>
        isLocalizedField(f.name, steps),
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

    await db
        .collection(`${collectionName}_translations`)
        .insertMany(translations);
    await redis.del(collectionName);
    await invalidateListCache(collectionName);
    return mainDoc.slug;
}

/**
 * Универсальная функция для получения элемента по slug для админки с нормализацией со схемой
 */
export async function getItemFromDB(slug, collectionName) {
    const db = await connectToDatabase();

    const item = await db.collection(collectionName).findOne({ slug });

    const translation = await db
        .collection(`${collectionName}_translations`)
        .find({ itemSlug: slug })
        .toArray();

    return { item, translation };
}

/**
 * Универсальная функция для получения элемента со всеми данными (для admin)
 */
export async function getFullItemFromDB(slug, collectionName, lang = "en") {
    const db = await connectToDatabase();

    // Основной документ
    const item = await db.collection(collectionName).findOne({ slug });
    if (!item) {
        console.log("❌ NOT FOUND:", { slug, collectionName, lang });
        return null;
    }

    // Один перевод для нужного языка
    const translation = await db
        .collection(`${collectionName}_translations`)
        .findOne({ itemSlug: slug, lang });

    // Отзывы
    const reviews = await db
        .collection("reviews")
        .find({ itemSlug: slug })
        .sort({ date: -1 })
        .toArray();

    const safeReviews = reviews.map((r) => ({
        ...r,
        _id: r._id.toString(),
    }));

    const reviewsCount = safeReviews.length;
    const rating =
        reviewsCount > 0
            ? Math.round(
                  (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                      reviewsCount) *
                      10,
              ) / 10
            : null;

    // ⚡ Затираем поля перевода прямо на объект
    const safeItem = {
        ...item,
        _id: item._id.toString(),
        type: collectionName,
        // 👇 ВАЖНО
        reviews: safeReviews,
        reviewsCount,
        rating,
    };
    if (translation) {
        for (const key in translation) {
            if (key !== "_id" && key !== "itemSlug" && key !== "lang") {
                safeItem[key] = translation[key];
            }
        }
    }

    return {
        item: safeItem,
    };
}

/*Получение полного элемента с кешем */

export async function getFullItemCached(slug, collectionName, lang = null) {
    const cacheKey = `fullItem_${collectionName}_${slug}_${lang || "all"}`;

    // 1️⃣ Попытка достать из кеша
    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            try {
                // Если Upstash вернул объект вместо строки — приводим к строке
                const str =
                    typeof cached === "string"
                        ? cached
                        : JSON.stringify(cached);
                console.log(`[Cache] Данные взяты из кеша: ${cacheKey}`);
                return JSON.parse(str);
            } catch (err) {
                console.warn(
                    `[Cache] Невалидный JSON в кеше: ${cacheKey}, сбросим`,
                    err,
                );
                await redis.del(cacheKey); // удаляем мусор
            }
        }
    } catch (err) {
        console.error(`[Cache] Ошибка при чтении из Redis: ${cacheKey}`, err);
    }

    // 2️⃣ Достаем из базы
    const data = await getFullItemFromDB(slug, collectionName, lang);
    if (!data) return null;

    // 3️⃣ Безопасная рекурсивная сериализация
    function deepSafe(obj) {
        if (obj === null || typeof obj !== "object") return obj;
        if (obj instanceof Date) return obj.toISOString();
        if (obj._id) return { ...obj, _id: obj._id.toString() };
        if (Array.isArray(obj)) return obj.map(deepSafe);

        const res = {};
        for (const [key, value] of Object.entries(obj)) {
            res[key] = typeof value === "undefined" ? null : deepSafe(value);
        }
        return res;
    }

    const safeData = deepSafe(data);

    // 4️⃣ Записываем в кеш как строку JSON
    try {
        await redis.set(cacheKey, JSON.stringify(safeData), {
            ex: CACHE_TTL_SECONDS,
        });
        console.log(`[Cache] Сохранили в Redis: ${cacheKey}`);
    } catch (err) {
        console.error(`[Cache] Не удалось записать в кеш: ${cacheKey}`, err);
    }

    return safeData;
}

/**
 * Универсальная функция для обновления элемента
 */
export async function updateItemInDB(slug, data, collectionName, steps) {
    const db = await connectToDatabase();
    const allFields = flattenFields(steps);

    const localizedFields = allFields.filter((f) =>
        isLocalizedField(f.name, steps),
    );

    // Основной документ (без локализованных полей)
    const mainDoc = { ...data };
    for (const field of localizedFields) {
        delete mainDoc[field.name];
    }

    if (data.slug && data.slug !== slug) {
        mainDoc.slug = data.slug.trim().toLowerCase();
    }

    await db.collection(collectionName).updateOne(
        { slug },
        {
            $set: {
                ...mainDoc,
                updatedAt: new Date(),
            },
        },
    );

    // Обновляем переводы
    await db
        .collection(`${collectionName}_translations`)
        .deleteMany({ itemSlug: slug });

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

    await db
        .collection(`${collectionName}_translations`)
        .insertMany(translations);
    await redis.del(collectionName);
    await invalidateListCache(collectionName); // ✅ добавляем
    await invalidateFullItemCache(slug, collectionName);

    return mainDoc.slug || slug;
}

/**
 * Универсальная функция для удаления элемента
 */
export async function deleteItemFromDB(slug, collectionName) {
    const db = await connectToDatabase();
    await db.collection(collectionName).deleteOne({ slug });
    await db
        .collection(`${collectionName}_translations`)
        .deleteMany({ itemSlug: slug });
    await redis.del(collectionName);
    await invalidateListCache(collectionName);
    await invalidateFullItemCache(slug, collectionName);
    return true;
}

/**
 * Инвалидируем кеш списка элементов по типу (и всем языкам)
 */
export async function invalidateListCache(collectionName) {
    const keys = await redis.keys(`list:${collectionName}:*`);
    if (keys.length) {
        await redis.del(keys);
        console.log(`[Cache] Инвалидирован список: ${collectionName}`);
    }
}

/**
 * Инвалидируем кеш конкретного элемента
 */
export async function invalidateFullItemCache(slug, collectionName) {
    const keys = await redis.keys(`fullItem_${collectionName}_${slug}_*`);
    if (keys.length) {
        await redis.del(keys);
    }
}
