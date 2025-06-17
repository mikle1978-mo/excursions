import { connectToDatabase } from "$lib/server/mongodb";
import { enrichTours } from "$lib/helpers/process-tours";

export async function load() {
    const db = await connectToDatabase();

    const toursDb = await db
        .collection("excursions")
        .aggregate([
            { $sample: { size: 100 } },
            {
                $lookup: {
                    from: "excursions_translations",
                    localField: "slug",
                    foreignField: "tourSlug",
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
                    let: { tour_slug: "$slug" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$tourSlug", "$$tour_slug"] },
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

    const tours = enrichTours(toursDb);

    return {
        excursions: tours,
    };
}
