// src\routes\api\cache\clear\+server.js

import { json } from "@sveltejs/kit";
import { redis } from "$lib/server/db/redis.js";

export async function POST() {
    try {
        await redis.flushdb(); // удаляет все ключи в базе
        return json({
            success: true,
            message: "Весь кеш очищен",
        });
    } catch (error) {
        console.error("Ошибка очистки кеша:", error);
        return json(
            { success: false, message: "Ошибка очистки кеша" },
            { status: 500 }
        );
    }
}
