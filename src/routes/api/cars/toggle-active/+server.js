import { connectToDatabase } from "$lib/server/mongodb";

export async function POST({ request }) {
    const { slug, active } = await request.json();

    const db = await connectToDatabase();
    const result = await db
        .collection("cars")
        .updateOne({ slug }, { $set: { active } });

    return new Response(JSON.stringify({ success: result.modifiedCount > 0 }));
}
