import { redis } from "$lib/server/db/redis";
import { appConfig } from "$lib/config/app.config.js";

const currencyConfig = appConfig.services.currency;

export async function getExchangeRates() {
    console.log("=== getExchangeRates START ===");
    const cacheKey = currencyConfig.cacheKey;

    if (!currencyConfig.enabled) {
        console.log("Currency service disabled, returning fallback rates");
        return currencyConfig.fallbackRates;
    }

    // Проверяем кеш
    try {
        const cached = await redis.get(cacheKey);
        console.log("Raw cached value from Redis:", cached);

        if (cached) {
            const ttl = await redis.ttl(cacheKey);
            console.log("Cached TTL left (sec):", ttl);

            if (ttl > 0) {
                try {
                    const parsed =
                        typeof cached === "string"
                            ? JSON.parse(cached)
                            : cached;

                    console.log("Using cached rates:", parsed);
                    return parsed;
                } catch (err) {
                    console.warn(
                        "Cached value is invalid JSON, ignoring cache:",
                        err
                    );
                }
            } else {
                console.log("Cached value expired, fetching new rates");
            }
        } else {
            console.log("No cached value found, will fetch from API");
        }
    } catch (err) {
        console.warn("Redis get error, ignoring cache:", err);
    }

    // Запрос к API
    try {
        console.log("Fetching rates from API");
        const response = await fetch(currencyConfig.apiUrl);

        if (!response.ok) {
            throw new Error("Exchange API returned status " + response.status);
        }

        const data = await response.json();
        console.log("Raw data from API:");

        const allRates = data.conversion_rates || currencyConfig.fallbackRates;
        const filteredRates = {};
        for (const cur of currencyConfig.target) {
            filteredRates[cur] =
                allRates[cur] ?? currencyConfig.fallbackRates[cur];
        }
        console.log("Filtered rates:", filteredRates);

        // Сохраняем в Redis с TTL
        try {
            await redis.set(cacheKey, JSON.stringify(filteredRates), {
                ex: currencyConfig.ttl,
            });
            console.log("Rates saved to Redis with TTL:", currencyConfig.ttl);
        } catch (err) {
            console.warn("Redis set error:", err);
        }

        return filteredRates;
    } catch (err) {
        console.warn("Error fetching rates, using fallback:", err);
        return currencyConfig.fallbackRates;
    }
}
