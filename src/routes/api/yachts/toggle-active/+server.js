// src/routes/api/excursions/toggle-active/+server.js
import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";
export async function POST({ request }) {
    const { slug, active } = await request.json();

    const db = await connectToDatabase();
    const result = await db
        .collection("yachts")
        .updateOne({ slug }, { $set: { active } });
    await redis.del("yachts");
    return new Response(JSON.stringify({ success: result.modifiedCount > 0 }));
}
