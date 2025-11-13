import { connectToDatabase } from "$lib/server/db/mongodb";

const COLLECTIONS = [
    { name: "excursions", type: "excursion" },
    { name: "yachts", type: "yacht" },
    { name: "cars", type: "car" },
    { name: "transfers", type: "transfer" },
    { name: "places", type: "place" },
    { name: "blogs", type: "blog" },
    // можно добавить позже:
    // { name: "real_estate", type: "real_estate" },
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
                .find(
                    {},
                    {
                        projection: {
                            slug: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            _id: 1, // нужно для fallback по дате
                        },
                    }
                )
                .toArray();

            results.push(
                ...items.map((item) => ({
                    slug: item.slug,
                    type,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    _id: item._id,
                }))
            );
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
