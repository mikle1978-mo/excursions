import { composeCards } from "$lib/server/services/shared/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

export async function load(event) {
    const { params, route } = event;
    const lang = params.lang || "en";

    // ✅ Берём именно route.id, не route
    const type = route?.id?.split("/").filter(Boolean).at(-1).startsWith("[")
        ? route.id.split("/").filter(Boolean).at(-2)
        : route.id.split("/").filter(Boolean).at(-1);

    const CACHE_KEY = `${type}_${lang}`; // 👈 уникально для языка и типа

    let items = await getCache(CACHE_KEY);

    if (!items) {
        items = await composeCards({
            type,

            lang,
        });

        await setCache(CACHE_KEY, items, CACHE_TTL_SECONDS);
    }

    return {
        type,
        items,
        lang,
    };
}
