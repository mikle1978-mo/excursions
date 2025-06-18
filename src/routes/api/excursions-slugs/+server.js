import { connectToDatabase } from "$lib/server/mongodb";
export async function GET() {
    try {
        const db = await connectToDatabase();
        const excursions = await db
            .collection("excursions")
            .find({}, { projection: { slug: 1 } })
            .toArray();

        const slugs = excursions.map((e) => e.slug);

        return new Response(JSON.stringify(slugs), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Ошибка при получении слагов" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
