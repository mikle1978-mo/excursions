import { connectToDatabase } from "$lib/server/mongodb";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
    try {
        const db = await connectToDatabase();
        const reviews = await db
            .collection("reviews")
            .find({ itemSlug: params.slug })
            .sort({ createdAt: -1 }) // сортировка по дате, по желанию
            .toArray();

        return new Response(JSON.stringify(reviews), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Ошибка при получении отзывов:", error);
        return new Response(
            JSON.stringify({ error: "Ошибка при получении отзывов" }),
            { status: 500 }
        );
    }
}
