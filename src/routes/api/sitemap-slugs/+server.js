import { connectToDatabase } from "$lib/server/mongodb";

const COLLECTIONS = [
    { name: "excursions", type: "excursion" },
    { name: "yachts", type: "yacht" },
    { name: "cars", type: "car" },
    { name: "transfers", type: "transfer" },
    { name: "places", type: "place" },
    // сюда можно в будущем добавить:
    // { name: "real_estate", type: "real_estate" },
    // { name: "transfers", type: "transfer" },
];

export async function GET() {
    try {
        const db = await connectToDatabase();
        const collections = await db.listCollections().toArray();
        const existingCollectionNames = collections.map((c) => c.name);

        const results = [];

        for (const { name, type } of COLLECTIONS) {
            if (!existingCollectionNames.includes(name)) {
                console.warn(`Коллекция '${name}' не существует — пропускаем`);
                continue;
            }

            const items = await db
                .collection(name)
                .find({}, { projection: { slug: 1 } })
                .toArray();

            results.push(...items.map((item) => ({ slug: item.slug, type })));
        }

        return new Response(JSON.stringify(results), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Ошибка при получении слагов:", error);
        return new Response(
            JSON.stringify({ error: "Ошибка при получении данных" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
