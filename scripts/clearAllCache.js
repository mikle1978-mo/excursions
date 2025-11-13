import "dotenv/config";
import { redis } from "../src/lib/server/db/redis.js";

async function clearAllCache() {
    // Получаем все ключи
    const keys = await redis.keys("*");
    console.log("Удаляем ключи:", keys);

    // Удаляем их
    for (const key of keys) {
        await redis.del(key);
    }

    console.log("✅ Кеш очищен");
}

clearAllCache();
