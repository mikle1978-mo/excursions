import { connectToDatabase } from "$lib/server/mongodb";

export async function load() {
    const db = await connectToDatabase();

    const yachts = await db
        .collection("yachts")
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    slug: 1,
                    active: 1,
                    price: 1,
                },
            }
        )
        .sort({ slug: 1 })
        .toArray();

    return {
        yachts: yachts.map((t) => ({
            active: t.active,
            slug: t.slug,
            price: t.price,
        })),
    };
}
