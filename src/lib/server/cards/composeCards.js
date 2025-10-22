// src/lib/server/cards/composeCards.js

import { connectToDatabase } from "$lib/server/mongodb";
import { enrichCard } from "$lib/helpers/enrichCard";

/**
 * Универсальный сборщик карточек из разных коллекций
 * @param {Object} options
 * @param {string} options.type - Название основной коллекции (напр. "excursions", "yachts")
 * @param {string} [options.translationCollection] - Название коллекции переводов (напр. "excursions_translations")
 * @param {string} [options.reviewCollection] - Название коллекции отзывов (по умолчанию "reviews")
 * @returns {Promise<Array>} Обогащённые карточки
 */

/**
 * Универсальный сборщик карточек из разных коллекций
 */
export async function composeCards({
    type,
    translationCollection = `${type}_translations`,
    reviewCollection = "reviews",
}) {
    const db = await connectToDatabase();

    // 💡 Выбираем тип выборки: случайно или по дате
    const pipeline = [];

    if (type === "blogs" || type === "places") {
        pipeline.push(
            { $sort: { createdAt: -1 } }, // последние сначала
            { $limit: 100 }
        );
    } else {
        pipeline.push({ $sample: { size: 100 } }); // случайно
    }

    pipeline.push(
        {
            $lookup: {
                from: translationCollection,
                localField: "slug",
                foreignField: "itemSlug",
                as: "translations",
            },
        },
        {
            $addFields: {
                title: {
                    $arrayToObject: {
                        $map: {
                            input: "$translations",
                            as: "t",
                            in: { k: "$$t.lang", v: "$$t.title" },
                        },
                    },
                },
                description: {
                    $arrayToObject: {
                        $map: {
                            input: "$translations",
                            as: "t",
                            in: { k: "$$t.lang", v: "$$t.description" },
                        },
                    },
                },
            },
        },
        {
            $lookup: {
                from: reviewCollection,
                let: { item_slug: "$slug" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$itemSlug", "$$item_slug"] },
                        },
                    },
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
        },
        {
            $addFields: {
                reviewsCount: {
                    $ifNull: [{ $arrayElemAt: ["$reviewsStats.count", 0] }, 0],
                },
                rating: {
                    $ifNull: [
                        {
                            $round: [
                                {
                                    $arrayElemAt: [
                                        "$reviewsStats.avgRating",
                                        0,
                                    ],
                                },
                                1,
                            ],
                        },
                        null,
                    ],
                },
            },
        }
    );

    const rawItems = await db.collection(type).aggregate(pipeline).toArray();

    const items = rawItems.map(
        ({ _id, translations = [], reviewsStats = [], ...rest }) => ({
            ...rest,
            translations: translations.map(({ _id, ...t }) => t),
            reviewsStats: reviewsStats.map(({ _id, ...r }) => r),
        })
    );

    return enrichCard(items);
}
