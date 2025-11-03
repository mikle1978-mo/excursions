// src/lib/server/cards/composeCards.js
import { connectToDatabase } from "$lib/server/mongodb";
import { enrichCard } from "$lib/helpers/enrichCard";

/**
 * Универсальный сборщик карточек с применением перевода
 * @param {Object} options
 * @param {string} options.type - Название основной коллекции (например, "excursions", "yachts")
 * @param {string} [options.translationCollection] - Название коллекции переводов (по умолчанию `${type}_translations`)
 * @param {string} [options.reviewCollection] - Название коллекции отзывов (по умолчанию "reviews")
 * @param {string} [options.lang] - Язык перевода (по умолчанию "en")
 * @returns {Promise<Array>} Обогащённые карточки
 */
export async function composeCards({
    type,
    translationCollection = `${type}_translations`,
    reviewCollection = "reviews",
    lang = "en",
}) {
    const db = await connectToDatabase();

    const pipeline = [];

    // 💡 Выборка: блоги и места по дате, остальное случайно
    if (type === "blogs" || type === "places") {
        pipeline.push({ $sort: { createdAt: -1 } }, { $limit: 100 });
    } else {
        pipeline.push({ $sample: { size: 100 } });
    }

    // Подтягиваем переводы
    pipeline.push({
        $lookup: {
            from: translationCollection,
            localField: "slug",
            foreignField: "itemSlug",
            as: "translations",
        },
    });

    // Подсчёт отзывов
    pipeline.push({
        $lookup: {
            from: reviewCollection,
            let: { item_slug: "$slug" },
            pipeline: [
                { $match: { $expr: { $eq: ["$itemSlug", "$$item_slug"] } } },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        avgRating: { $avg: "$rating" },
                    },
                },
            ],
            as: "reviewsStats",
        },
    });

    // Выбираем перевод для нужного языка и вычисляем reviewsCount/rating
    pipeline.push({
        $addFields: {
            translation: {
                $arrayElemAt: [
                    {
                        $filter: {
                            input: "$translations",
                            as: "t",
                            cond: { $eq: ["$$t.lang", lang] },
                        },
                    },
                    0,
                ],
            },
            reviewsCount: {
                $ifNull: [{ $arrayElemAt: ["$reviewsStats.count", 0] }, 0],
            },
            rating: {
                $ifNull: [
                    {
                        $round: [
                            { $arrayElemAt: ["$reviewsStats.avgRating", 0] },
                            1,
                        ],
                    },
                    null,
                ],
            },
        },
    });

    const rawItems = await db.collection(type).aggregate(pipeline).toArray();

    // ⚡ Перекрываем оригинальные поля карточки переводом
    const items = rawItems.map(
        ({ translation = {}, reviewsStats, translations, ...rest }) => {
            const item = { ...rest };

            // Перекрываем поля переводом, если они есть
            for (const key in translation) {
                if (translation[key] != null) {
                    item[key] = translation[key];
                }
            }

            // Преобразуем _id основного документа в строку
            if (item._id) {
                item._id = item._id.toString();
            }

            // Оставляем статистику отзывов, _id тоже приводим к строке
            item.reviewsStats = reviewsStats.map((r) => ({
                ...r,
                _id: r._id ? r._id.toString() : undefined,
            }));

            return item;
        }
    );

    return enrichCard(items);
}
