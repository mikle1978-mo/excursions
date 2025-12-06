// src\routes\(app)\[lang]\+layout.server.js
import { redirect, error } from "@sveltejs/kit";
import { appConfig } from "$lib/config/app.config.js";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ url }) {
    const pathname = url.pathname; // например: / или /ru/about
    const segments = pathname.split("/").filter(Boolean);
    const lang = segments[0] ?? "";
    const type = segments[1] ?? "";

    console.log("Global layout segment:", lang);

    const supported = appConfig.languages.supported;

    // Если путь пустой (/) — редиректим на дефолтный язык
    if (!lang) {
        throw redirect(301, `/${supported[0]}`);
    }

    // Если первый сегмент не поддерживаемый язык — 404
    if (!supported.includes(lang)) {
        throw error(404, "Page Not Found global", segments);
    }

    return {
        lang,
        type,
    };
}
