import { redis } from "$lib/server/db/redis.js";
import { appConfig } from "$lib/config/app.config.js";

const cacheConfig = appConfig.cache;

// Универсальный кеш
export const cache = {
    async getItem(type, { slug, lang }) {
        const cfg = cacheConfig[type];
        if (!cfg)
            throw new Error(`Cache config not found for collection: ${type}`);

        const key = `${cfg.prefix}:fullItem:${slug}:${lang}`;
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    },

    async setItem(type, { slug, lang }, value) {
        const cfg = cacheConfig[type];
        if (!cfg)
            throw new Error(`Cache config not found for collection: ${type}`);

        const key = `${cfg.prefix}:fullItem:${slug}:${lang}`;
        await redis.set(key, JSON.stringify(value), { ex: cfg.ttl });
    },

    async getList(type, { lang }) {
        const cfg = cacheConfig[type];
        if (!cfg)
            throw new Error(`Cache config not found for collection: ${type}`);

        const key = `${cfg.prefix}:list:${lang}`;
        const data = await redis.get(key);
        if (!data) return null;

        // Если это уже объект/массив — просто возвращаем
        if (typeof data === "object") return data;

        // Иначе парсим строку
        return JSON.parse(data);
    },

    async setList(type, { lang }, value) {
        const cfg = cacheConfig[type];
        if (!cfg)
            throw new Error(`Cache config not found for collection: ${type}`);

        const key = `${cfg.prefix}:list:${lang}`;
        await redis.set(key, JSON.stringify(value), { ex: cfg.ttl });
    },

    /**
     * 🔹 Универсальный метод инвалидирования по паттерну
     *
     * Формат ключей в Redis:
     *
     * 1. Full item для конкретного языка:
     *    {prefix}:fullItem:{slug}:{lang}
     *    Пример: excursions:fullItem:rafting:ru
     *
     * 2. Full item для всех языков:
     *    {prefix}:fullItem:{slug}:*
     *    Пример: excursions:fullItem:rafting:*
     *
     * 3. Список элементов для конкретного языка:
     *    {prefix}:list:{lang}
     *    Пример: excursions:list:ru
     *
     * 4. Список элементов для всех языков:
     *    {prefix}:list:*
     *    Пример: excursions:list:*
     *
     * Чтобы инвалидировать любой из этих кейсов, используйте паттерн:
     * await cache.invalidateKeysByPattern('excursions:fullItem:rafting:ru')
     * await cache.invalidateKeysByPattern('excursions:list:*')
     */
    async invalidateKeysByPattern(pattern) {
        const keys = await redis.keys(pattern);
        if (keys.length) {
            await redis.del(keys);
        }
    },
};
