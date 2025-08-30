import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "places"; // Можно включить язык, тип и т.п.

export async function load() {
    let places = await getCache(CACHE_KEY);
    console.log("cache====================================");
    console.log(places);
    console.log("cache====================================");
    if (places) {
        return { places };
    }
    // Если нет кеша — грузим из базы
    places = await composeCards({
        type: "places",
        translationCollection: "places_translations",
        lang: "en",
    });
    console.log("====================================");
    console.log(places);
    console.log("====================================");
    // Сохраняем в кеш на сутки
    await setCache(CACHE_KEY, places, CACHE_TTL_SECONDS);

    return { places, noLayout: true };
}
