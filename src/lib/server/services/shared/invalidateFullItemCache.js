import { redis } from "$lib/server/db/redis";

/**
 * Инвалидируем кеш конкретного элемента
 */
export async function invalidateFullItemCache(slug, collectionName) {
    const keys = await redis.keys(`fullItem_${collectionName}_${slug}_*`);
    if (keys.length) {
        await redis.del(keys);
    }
}
