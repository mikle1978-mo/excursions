import { connectToDatabase } from "$lib/server/mongodb";

export async function POST({ request }) {
    const { slug } = await request.json();
    const db = await connectToDatabase();

    const excursion = await db.collection("excursions").findOne({ slug });
    if (!excursion) {
        return new Response(JSON.stringify({ error: "Экскурсия не найдена" }), {
            status: 404,
        });
    }

    // Генерация нового slug
    const newSlug = `${slug}-copy-${Date.now()}`;
    const newExcursion = { ...excursion, slug: newSlug };
    delete newExcursion._id;

    await db.collection("excursions").insertOne(newExcursion);

    return new Response(JSON.stringify({ success: true, newSlug }), {
        status: 200,
    });
}
