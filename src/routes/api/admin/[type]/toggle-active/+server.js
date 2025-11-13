// src/routes/api/excursions/toggle-active/+server.js
import { connectToDatabase } from "$lib/server/db/mongodb";
import { redis } from "$lib/server/db/redis";
export async function POST({ request }) {
    const { slug, active } = await request.json();

    const db = await connectToDatabase();
    const result = await db
        .collection("blogs")
        .updateOne({ slug }, { $set: { active } });

    await redis.del("blogs");

    return new Response(JSON.stringify({ success: result.modifiedCount > 0 }));
}
