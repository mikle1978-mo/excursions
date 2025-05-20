import { connectToDatabase } from "$lib/server/mongodb";

export async function load() {
    const db = await connectToDatabase();
    const collection = db.collection("tours");

    const tours = await collection
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    slug: 1,
                    title: 1,
                    description: 1,
                    images: 1,
                    duration: 1,
                    groupSize: 1,
                    price: 1,
                    rating: 1,
                    reviews: 1,
                    isPopular: 1,
                },
            }
        )
        .toArray();

    return {
        excursions: tours,
    };
}
