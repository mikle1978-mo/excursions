import { redis } from "$lib/server/db/redis";
/**
 * Инвалидировать кеш списка элементов по типу (и всем языкам)
 */
export async function invalidateListCache(collectionName) {
    const keys = await redis.keys(`list:${collectionName}:*`);
    if (keys.length) {
        await redis.del(keys);
        console.log(`[Cache] Инвалидирован список: ${collectionName}`);
    }
}
