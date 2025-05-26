import { connectToDatabase } from "$lib/server/mongodb";

export async function load() {
    const db = await connectToDatabase();

    const tours = await db
        .collection("excursions")
        .find({}, { projection: { _id: 0, slug: 1 } })
        .sort({ slug: 1 }) // сортируем по алфавиту по слагу
        .toArray();

    return {
        excursions: tours.map((t) => ({
            slug: t.slug,
            // заголовок не нужен, только slug
        })),
    };
}
