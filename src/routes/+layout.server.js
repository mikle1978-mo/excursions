import { error } from "@sveltejs/kit";
import { EN_VALID_ROUTES } from "$lib/constants/routes";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params, url }) {
    const pathname = url.pathname; // Например: /ru/about или /about
    const segments = pathname.split("/").filter(Boolean);
    const firstSegment = segments[0] ?? "";

    if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
        return { lang: firstSegment };
    }

    // Если первый сегмент — это не язык, проверяем валидность для английского
    if (firstSegment && !EN_VALID_ROUTES.includes(firstSegment)) {
        throw error(404, "Page Not Found");
    }

    // Всё ок — английский без префикса
    return { lang: "en" };
}
