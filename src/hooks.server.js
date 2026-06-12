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
    if (event.url.pathname.startsWith("/api")) {
        return resolve(event);
    }

    if (event.url.pathname.startsWith("/.well-known")) {
        return new Response(null, { status: 204 });
    }

    // Прогрев MongoDB при первом запросе
    if (!warmedUp) {
        console.log("⏱ Прогреваем MongoDB на первом запросе");
        warmedUp = true;
        await connectToDatabase();
    }

    // 🌐 Определяем язык страницы (универсально)
    const cookieLang = event.cookies.get("lang");

    const headerLangRaw = event.request.headers.get("accept-language");

    const headerLang = headerLangRaw?.split(",")[0]?.split("-")[0];

    const urlLang = SUPPORTED_LANGUAGES.find(
        (lang) =>
            event.url.pathname === `/${lang}` ||
            event.url.pathname.startsWith(`/${lang}/`),
    );

    let lang;

    // URL главный
    if (urlLang) {
        lang = urlLang;
    }

    // иначе fallback
    else {
        lang =
            cookieLang ||
            (SUPPORTED_LANGUAGES.includes(headerLang) ? headerLang : "en");
    }

    event.locals.lang = lang;

    // 💰 Получаем валюты и кладём в locals

    const cookieCurrency = event.cookies.get("currency");

    event.locals.currency = cookieCurrency || "USD";

    const res = await getExchangeRates();
    console.log(res.source);
    event.locals.exchangeRates = res.data;

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace("%lang%", lang),
    });
}
