import { redis } from "$lib/server/db/redis.js";
const oneDayInSeconds = 24 * 60 * 60;

export async function getCache(key) {
    const data = await redis.get(key);
    console.log(
        data
            ? `✅ Кеш найден по ключу: ${key}`
            : `❌ Кеш пустой по ключу: ${key}`
    );
    return data;
}

export async function setCache(key, value, ttlSeconds = oneDayInSeconds) {
    console.log(`💾 Сохраняем в кеш: ${key}`);
    await redis.set(key, value, { ex: ttlSeconds });
}
