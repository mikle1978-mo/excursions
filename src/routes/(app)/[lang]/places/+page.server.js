import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "excursions"; // Можно включить язык, тип и т.п.

export async function load() {
    let excursions = await getCache(CACHE_KEY);
    if (excursions) {
        return { excursions };
    }
    // Если нет кеша — грузим из базы
    excursions = await composeCards({
        type: "excursions",
        translationCollection: "excursions_translations",
        lang: "en",
    });
    // Сохраняем в кеш на сутки
    await setCache(CACHE_KEY, excursions, CACHE_TTL_SECONDS);

    return { excursions, noLayout: true };
}
