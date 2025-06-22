import { connectToDatabase } from "$lib/server/mongodb";
import { enrichTours } from "$lib/helpers/process-tours";

export async function load() {
    const db = await connectToDatabase();

    const yachtsDb = await db
        .collection("yachts")
        .aggregate([
            { $sample: { size: 100 } },
            {
                $lookup: {
                    from: "yachts_translations",
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
                                in: {
                                    k: "$$t.lang",
                                    v: "$$t.title",
                                },
                            },
                        },
                    },
                    description: {
                        $arrayToObject: {
                            $map: {
                                input: "$translations",
                                as: "t",
                                in: {
                                    k: "$$t.lang",
                                    v: "$$t.description",
                                },
                            },
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "reviews",
                    let: { yacht_slug: "$slug" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$itemSlug", "$$yacht_slug"] },
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

            {
                $project: {
                    _id: 0,
                    slug: 1,
                    images: 1,
                    duration: 1,
                    groupSize: 1,
                    price: 1,
                    discount: 1,
                    title: 1,
                    labels: 1,
                    description: 1,
                    rating: 1,
                    reviewsCount: 1,
                    createdAt: 1,
                },
            },
        ])
        .toArray();

    const yachts = enrichTours(yachtsDb);

    return {
        yachts: yachts,
    };
}
