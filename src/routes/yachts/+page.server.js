import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "yachts"; // Можно включить язык, тип и т.п.

export async function load() {
    let yachts = await getCache(CACHE_KEY);
    if (yachts) {
        return { yachts };
    }

    yachts = await composeCards({
        type: "yachts",
        translationCollection: "yachts_translations",
        lang: "en",
    });

    await setCache(CACHE_KEY, yachts, CACHE_TTL_SECONDS);

    return { yachts };
}
