// Редирект с корня сайта на нужную локаль
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies, request }) {
    const cookieLocale = cookies.get("locale");
    const headerLocale = request.headers
        .get("accept-language")
        ?.startsWith("ru")
        ? "ru"
        : "en";
    const finalLocale = cookieLocale || headerLocale;

    throw redirect(307, `/${finalLocale}`);
}
