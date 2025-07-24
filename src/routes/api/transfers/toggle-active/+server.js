// src/routes/api/excursions/toggle-active/+server.js
import { connectToDatabase } from "$lib/server/mongodb";
import { json } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";

export async function POST({ request }) {
    try {
        const { slug, active } = await request.json();

        if (!slug || typeof active !== "boolean") {
            return json(
                { error: "Неверные данные: требуется slug и active (boolean)" },
                { status: 400 }
            );
        }

        const db = await connectToDatabase();

        const result = await db
            .collection("transfers")
            .updateOne({ slug }, { $set: { active } });

        if (result.matchedCount === 0) {
            return json(
                { success: false, error: "Трансфер с таким slug не найден" },
                { status: 404 }
            );
        }
        await redis.del("transfers");
        return json({ success: result.modifiedCount > 0 });
    } catch (err) {
        console.error("Ошибка при обновлении статуса:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
