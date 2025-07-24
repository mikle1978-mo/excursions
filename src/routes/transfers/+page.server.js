import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "transfers"; // Можно включить язык, тип и т.п.

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
