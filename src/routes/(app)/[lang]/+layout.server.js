import { error } from "@sveltejs/kit";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export async function load({ params, url }) {
    if (!SUPPORTED_LANGUAGES.includes(params.lang)) {
        throw error(404, "Not found");
    }

    return {
        lang: params.lang,
        pathname: url.pathname.slice(`/${params.lang}`.length),
    };
}
