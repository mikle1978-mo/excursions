// src/hooks.server.js
import { connectToDatabase } from "$lib/server/db/mongodb";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
import { getExchangeRates } from "$lib/server/services/shared/currency/exchange.service";

import { redirect } from "@sveltejs/kit";

let warmedUp = false;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // 410 Gone для удалённых префиксов
    const removedPrefixes = ["/catalog/", "/landings/", "/cart/"];

    if (
        removedPrefixes.some((prefix) => event.url.pathname.startsWith(prefix))
    ) {
        console.log(`🔒 Запрос на удалённый путь: ${event.url.pathname}`);
        return new Response("Gone", { status: 410 });
    }

    // 🔐 Защита админки
    if (event.url.pathname.startsWith("/admin")) {
        const session = event.cookies.get("session");
        if (session !== "admin-session") {
            throw redirect(303, "/login");
        }
    }

    // Прогрев MongoDB при первом запросе
    if (!warmedUp) {
        console.log("⏱ Прогреваем MongoDB на первом запросе");
        warmedUp = true;
        await connectToDatabase();
    }

    // 🌐 Определяем язык страницы (универсально)
    const pathname = event.url.pathname;
    const foundLang = SUPPORTED_LANGUAGES.find(
        (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)
    );
    const lang = foundLang || "en"; // "en" — язык по умолчанию

    // САМЫЙ ВАЖНЫЙ МОМЕНТ
    event.locals.lang = lang;

    // 💰 Получаем валюты и кладём в locals
    event.locals.exchangeRates = await getExchangeRates();

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace("%lang%", lang),
    });
}
