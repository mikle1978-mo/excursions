// src/lib/server/cache/invalidateAfterChange.js
import { cache } from "$lib/server/cache/cache.js";
import { collectionsConfig } from "$lib/config/app.config.js";

/**
 * Инвалидирует кеш для списка и fullItem после изменения/создания/удаления
 * @param {string} type - тип коллекции
 * @param {string} [slug] - slug элемента (необязательный)
 */
export async function invalidateCache(type, slug) {
    const cfg = collectionsConfig[type]?.cacheConfig;
    if (!cfg) throw new Error(`Cache config not found for collection: ${type}`);
    const prefix = cfg.prefix;

    // Список всех языков
    await cache.invalidateKeysByPattern(`${prefix}:list:*`);

    // Если есть slug, инвалидируем fullItem
    if (slug) {
        await cache.invalidateKeysByPattern(`${prefix}:fullItem:${slug}:*`);
    }
}
