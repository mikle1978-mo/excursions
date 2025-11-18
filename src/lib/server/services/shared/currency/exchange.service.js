import { redis } from "$lib/server/db/redis";
import { appConfig } from "$lib/config/app.config.js";

const currencyConfig = appConfig.currency;

export async function getExchangeRates() {
    const cacheKey = currencyConfig.cacheKey;

    if (!currencyConfig.enabled) {
        return currencyConfig.fallbackRates;
    }

    // Проверяем кеш
    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            console.log("Using cached rates from Redis:", cached);
            return cached; // <- уже объект, parse не нужен
        }
    } catch (err) {
        console.warn("Redis get error, ignoring cache:", err);
    }

    // Запрос к API
    try {
        const response = await fetch(currencyConfig.apiUrl);
        if (!response.ok)
            throw new Error("Exchange API returned " + response.status);

        const data = await response.json();
        const allRates = data.conversion_rates || currencyConfig.fallbackRates;

        const filteredRates = {};
        for (const cur of currencyConfig.target) {
            filteredRates[cur] =
                allRates[cur] ?? currencyConfig.fallbackRates[cur];
        }

        // Сохраняем в Redis
        try {
            await redis.set(cacheKey, filteredRates, {
                ex: currencyConfig.ttl,
            });
            console.log("Rates saved to Redis:", filteredRates);
        } catch (err) {
            console.warn("Redis set error:", err);
        }

        return filteredRates;
    } catch (err) {
        console.warn("Error fetching rates, using fallback:", err);
        return currencyConfig.fallbackRates;
    }
}
