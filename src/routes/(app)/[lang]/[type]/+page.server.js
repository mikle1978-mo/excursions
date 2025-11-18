import { composeCards } from "$lib/server/services/shared/cards/composeCards";
import { cache } from "$lib/server/cache/cache.js"; // универсальный кеш
import { appConfig } from "$lib/config/app.config.js";

export async function load(event) {
    const { params, route } = event;
    const lang = params.lang || "en";

    // Берём последний сегмент маршрута или предпоследний, если это динамический параметр
    const type = route?.id?.split("/").filter(Boolean).at(-1).startsWith("[")
        ? route.id.split("/").filter(Boolean).at(-2)
        : route.id.split("/").filter(Boolean).at(-1);

    // Берём конфиг кеша для коллекции
    const cacheConfig = appConfig.collections[type]?.cacheConfig;

    let items = null;

    // Если кеш настроен и включён, пробуем взять из него
    if (cacheConfig?.enabled) {
        items = await cache.getList(type, { lang });
    }

    // Если в кеше нет данных, формируем их через composeCards
    if (!items) {
        items = await composeCards({ type, lang });

        // Сохраняем в кеш, если он включён
        if (cacheConfig?.enabled) {
            await cache.setList(type, { lang }, items);
        }
    }

    return {
        type,
        items,
        lang,
    };
}
