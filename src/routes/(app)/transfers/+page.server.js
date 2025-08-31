import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "transfers"; // Можно включить язык, тип и т.п.

export async function load() {
    let items = await getCache(CACHE_KEY);

    if (!items) {
        // Если нет кеша — грузим из базы
        items = await composeCards({
            type: CACHE_KEY,
            translationCollection: `${CACHE_KEY}_translations`,
            lang: "en",
        });
        // Сохраняем в кеш на сутки
        await setCache(CACHE_KEY, items, CACHE_TTL_SECONDS);
    }

    return {
        type: CACHE_KEY,
        items,
    };
}
