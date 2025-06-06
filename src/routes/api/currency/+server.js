import { json } from "@sveltejs/kit";
import { loadCache, saveCache } from "$lib/server/currencyCache.js";

const API_URL =
    "https://v6.exchangerate-api.com/v6/41a85a00c5d3e34940ff0f77/latest/USD";

const CACHE_TTL = 1000 * 60 * 60; // 1 час

const DEFAULT_RATES = {
    USD: 1,
    EUR: 0.9,
    RUB: 75,
    TRY: 20,
};

export async function GET() {
    const now = Date.now();
    const cache = await loadCache();

    if (cache && now - cache.timestamp < CACHE_TTL && cache.rates) {
        console.log(
            `[Currency API] Используем свежий кеш (возраст ${
                (now - cache.timestamp) / 1000
            }s)`
        );
        return json({
            source: "cache",
            timestamp: cache.timestamp,
            rates: cache.rates,
        });
    }

    try {
        const res = await fetch(API_URL);

        if (!res.ok) {
            throw new Error(`Fetch failed: ${res.status}`);
        }

        const data = await res.json();
        const rates = data.conversion_rates || data.rates;

        if (!rates) {
            throw new Error("No rates found in API response");
        }

        await saveCache({ timestamp: now, rates });
        console.log("[Currency API] Получили данные с API и сохранили в кеш");

        return json({
            source: "api",
            timestamp: now,
            rates,
        });
    } catch (err) {
        console.warn(`[Currency API] Ошибка при запросе API: ${err.message}`);

        if (cache && cache.rates) {
            console.log(
                "[Currency API] Используем устаревший кеш из-за ошибки API"
            );
            return json({
                source: "stale-cache",
                timestamp: cache.timestamp,
                rates: cache.rates,
                warning: "Using stale cache due to API error",
            });
        }

        console.log(
            "[Currency API] Используем дефолтные курсы из-за отсутствия данных и кеша"
        );
        return json({
            source: "default",
            timestamp: now,
            rates: DEFAULT_RATES,
            warning: "Using default rates due to API and cache failure",
        });
    }
}
