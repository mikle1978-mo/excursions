import "dotenv/config";
import { redis } from "../src/lib/server/redis.js";

async function main() {
    try {
        const key = "blogs_ru"; // <- твой ключ
        const deleted = await redis.del(key);
        console.log(`🧹 Ключ "${key}" удалён:`, deleted);
    } catch (err) {
        console.error("❌ Ошибка при удалении ключа:", err);
    }
}

main();
