// src/hooks.server.js
import { connectToDatabase } from "$lib/server/mongodb";

let warmedUp = false;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Установка локали
    const cookieLocale = event.cookies.get("locale");
    event.locals.locale = cookieLocale === "ru" ? "ru" : "en";

    // 410 Gone для удалённых префиксов
    const removedPrefixes = ["/catalog/", "/landings/", "/cart/"];

    if (
        removedPrefixes.some((prefix) => event.url.pathname.startsWith(prefix))
    ) {
        console.log(`🔒 Запрос на удалённый путь: ${event.url.pathname}`);
        return new Response("Gone", { status: 410 });
    }

    // Прогрев MongoDB при первом запросе
    if (!warmedUp) {
        console.log("⏱ Прогреваем MongoDB на первом запросе");
        warmedUp = true;
        await connectToDatabase();
    }

    return resolve(event);
}
