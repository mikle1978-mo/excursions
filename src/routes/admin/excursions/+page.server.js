import { connectToDatabase } from "$lib/server/mongodb";

export async function load() {
    const db = await connectToDatabase();

    const excursions = await db
        .collection("excursions")
        .find(
            {},
            {
                projection: { _id: 0, slug: 1, active: 1, price: 1 },
            }
        )
        .toArray();

    const translations = await db
        .collection("excursions_translations")
        .find(
            {},
            {
                projection: { _id: 0, itemSlug: 1, lang: 1, title: 1 },
            }
        )
        .toArray();

    return {
        excursions,
        translations,
    };
}
