import { error } from "@sveltejs/kit";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export async function load({ params, url, locals }) {
    if (!SUPPORTED_LANGUAGES.includes(locals.lang)) {
        throw error(404, "Not found");
    }

    return {
        lang: locals.lang,
        pathname: url.pathname.slice(`/${locals.lang}`.length),
        rates: locals.exchangeRates,
        currency: locals.currency,
    };
}
