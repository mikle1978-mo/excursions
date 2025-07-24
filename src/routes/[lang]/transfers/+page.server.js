import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";

const CACHE_KEY = "transfers"; // Можно включить язык, тип и т.п.
const CACHE_TTL_SECONDS = 24 * 60 * 60; // 1 день

export async function load() {
    let transfers = await getCache(CACHE_KEY);
    if (transfers) {
        return { transfers };
    }

    transfers = await composeCards({
        type: "transfers",
        translationCollection: "transfers_translations",
        lang: "en",
    });

    await setCache(CACHE_KEY, transfers, CACHE_TTL_SECONDS);

    return { transfers };
}
