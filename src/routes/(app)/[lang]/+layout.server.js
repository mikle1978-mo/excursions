// src\routes\(app)\[lang]\+layuot.server.js

import { error } from "@sveltejs/kit";
import SUPPORTED_LANGUAGES from "$lib/constants/supportedLanguages";

export async function load({ params }) {
    if (!SUPPORTED_LANGUAGES.includes(params.lang)) {
        throw error(404, "Not found");
    }
}
