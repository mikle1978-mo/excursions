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
export async function composeCards({
    type,
    translationCollection = `${type}_translations`,
    reviewCollection = "reviews",
}) {
    const db = await connectToDatabase();

    const rawItems = await db
        .collection(type)
        .aggregate([
            { $sample: { size: 100 } },
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
                        $ifNull: [
                            { $arrayElemAt: ["$reviewsStats.count", 0] },
                            0,
                        ],
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
            },
        ])
        .toArray();

    const items = rawItems.map(
        ({ _id, translations = [], reviewsStats = [], ...rest }) => ({
            ...rest,
            translations: translations.map(({ _id, ...t }) => t),
            reviewsStats: reviewsStats.map(({ _id, ...r }) => r),
        })
    );

    return enrichCard(items);
}
