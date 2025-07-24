import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";

const CACHE_KEY = "excursions"; // Можно включить язык, тип и т.п.
const CACHE_TTL_SECONDS = 24 * 60 * 60; // 1 день

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

    return { excursions };
}
