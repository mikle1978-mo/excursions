import { redis } from "$lib/server/db/redis";
import { appConfig } from "$lib/config/app.config.js";

const currencyConfig = appConfig.services.currency;

let memoryCache = null;
let memoryCacheTime = 0;

const MEMORY_TTL = 60 * 1000; // 1 минута

export async function getExchangeRates() {
    console.log("💱 Получение курсов валют...");
    const now = Date.now();

    // ❌ сервис выключен
    if (!currencyConfig.enabled) {
        return {
            data: currencyConfig.fallbackRates,
            source: "fallback-disabled",
        };
    }

    // ⚡ 1. MEMORY CACHE (самый быстрый)
    if (memoryCache && now - memoryCacheTime < MEMORY_TTL) {
        return { data: memoryCache, source: "memory" };
    }

    const cacheKey = currencyConfig.cacheKey;

    // ⚡ 2. REDIS CACHE
    try {
        const cached = await redis.get(cacheKey);

        if (cached) {
            const parsed =
                typeof cached === "string" ? JSON.parse(cached) : cached;

            // обновляем memory cache
            memoryCache = parsed;
            memoryCacheTime = now;

            return { data: parsed, source: "redis" };
        }
    } catch (err) {
        console.warn("Redis error:", err);
    }

    // 🌐 3. API FETCH
    try {
        const response = await fetch(currencyConfig.apiUrl);

        if (!response.ok) {
            throw new Error("API error " + response.status);
        }

        const data = await response.json();

        const allRates = data.conversion_rates || currencyConfig.fallbackRates;

        const filteredRates = {};
        for (const cur of currencyConfig.target) {
            filteredRates[cur] =
                allRates[cur] ?? currencyConfig.fallbackRates[cur];
        }

        // 💾 save to Redis
        await redis.set(cacheKey, JSON.stringify(filteredRates), {
            ex: currencyConfig.ttl,
        });

        // ⚡ save to memory
        memoryCache = filteredRates;
        memoryCacheTime = now;

        return { data: filteredRates, source: "api" };
    } catch (err) {
        console.warn("API error, fallback used:", err);
        return {
            data: currencyConfig.fallbackRates,
            source: "fallback-api-error",
        };
    }
}
