import { json } from "@sveltejs/kit";
import { cache } from "$lib/server/cache/cache.js";
import { composeCards } from "$lib/server/services/shared/cards/composeCards.js";
import { appConfig } from "$lib/config/app.config.js";
import { connectToDatabase } from "$lib/server/db/mongodb";

export async function GET({ params }) {
    const db = await connectToDatabase();
    const { lang, type } = params;

    const cfg = appConfig?.cache?.[type];

    // 1️⃣ Чтение из кеша (если ошибка — упадёт)
    if (cfg?.enabled) {
        const cached = await cache.getList(type, { lang });

        if (cached) return json(cached);
    }

    // 2️⃣ Чтение из базы
    const items = await composeCards({ db, type, lang });

    // 3️⃣ Запись в кеш (если ошибка — упадёт)
    if (cfg?.enabled) {
        await cache.setList(type, { lang }, items);
    }

    return json(items);
}
