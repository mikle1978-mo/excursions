// src/routes/api/warmup/+server.js
import { connectToDatabase } from "$lib/server/mongodb";

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
    console.log("🔥 Прогрев подключения к MongoDB...");
    await connectToDatabase();
    return new Response("Warmed up", { status: 200 });
}
