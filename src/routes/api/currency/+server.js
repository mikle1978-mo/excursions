import { json } from "@sveltejs/kit";
import { getCache, setCache } from "$lib/server/cache.js";

const API_URL =
    "https://v6.exchangerate-api.com/v6/41a85a00c5d3e34940ff0f77/latest/USD";
const CACHE_KEY = "currency:usd";
const CACHE_TTL = 60 * 60; // 1 час

const DEFAULT_RATES = {
    USD: 1,
    EUR: 0.9,
    RUB: 75,
    TRY: 20,
};

export async function GET() {
    const cached = await getCache(CACHE_KEY);

    if (cached?.timestamp && Date.now() - cached.timestamp < CACHE_TTL * 1000) {
        console.log(`[Currency API] ✅ Используем кэш`);
        return json({
            source: "cache",
            timestamp: cached.timestamp,
            rates: cached.rates,
        });
    }

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const data = await res.json();
        const rates = data.conversion_rates || data.rates;

        if (!rates) throw new Error("No rates in API");

        const payload = { timestamp: Date.now(), rates };
        await setCache(CACHE_KEY, payload, CACHE_TTL);

        console.log(`[Currency API] 📡 Получено с API и сохранено в Redis`);
        return json({ source: "api", ...payload });
    } catch (err) {
        console.warn(`[Currency API] ⚠️ Ошибка API: ${err.message}`);

        if (cached?.rates) {
            return json({
                source: "stale-cache",
                timestamp: cached.timestamp,
                rates: cached.rates,
                warning: "Using stale cache due to API error",
            });
        }

        return json({
            source: "default",
            timestamp: Date.now(),
            rates: DEFAULT_RATES,
            warning: "Using default rates due to cache and API failure",
        });
    }
}
