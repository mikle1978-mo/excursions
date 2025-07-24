import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "cars"; // Можно включить язык, тип и т.п.

export async function load() {
    let cars = await getCache(CACHE_KEY);
    if (cars) {
        return { cars };
    }

    cars = await composeCards({
        type: "cars",
        translationCollection: "cars_translations",
        lang: "en",
    });

    await setCache(CACHE_KEY, cars, CACHE_TTL_SECONDS);

    return { cars };
}
