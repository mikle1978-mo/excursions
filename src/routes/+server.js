import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').RequestHandler} */
export function GET({ request }) {
    const browserLang =
        request.headers.get("accept-language")?.split(",")[0].slice(0, 2) ||
        "en";
    const supportedLanguages = ["ru", "en"];

    const lang = supportedLanguages.includes(browserLang) ? browserLang : "en";

    const url = new URL(request.url);
    const currentPath = url.pathname;

    if (!currentPath.startsWith(`/${lang}`)) {
        throw redirect(301, `/${lang}`);
    }
}
