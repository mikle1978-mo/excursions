// src/lib/config/cache/cache.config.js

/**
 * Конфиг кеширования для разных коллекций
 * Каждая коллекция может иметь свои настройки TTL (в секундах) и префикс
 */
export const cache = {
    excursions: {
        ttl: 3600, // 1 час
        prefix: "excursions",
    },
    yachts: {
        ttl: 3600,
        prefix: "yachts",
    },
    cars: {
        ttl: 1800, // 30 минут
        prefix: "cars",
    },
    transfers: {
        ttl: 1800,
        prefix: "transfers",
    },
    places: {
        ttl: 3600,
        prefix: "places",
    },
    blogs: {
        ttl: 600, // 10 минут
        prefix: "blogs",
    },
    faqs: {
        ttl: 600, // 10 минут
        prefix: "faqs",
    },
};
