// src/hooks.server.js
import { connectToDatabase } from "$lib/server/mongodb";
import { redirect } from "@sveltejs/kit";

let warmedUp = false;

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // 410 Gone для удалённых префиксов
    const removedPrefixes = ["/catalog/", "/landings/", "/cart/", "/en/"];

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

    return resolve(event);
}
