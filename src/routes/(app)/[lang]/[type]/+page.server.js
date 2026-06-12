// src\routes\(app)\[lang]\[type]\+page.server.js
import { error } from "@sveltejs/kit";

export async function load({ fetch, parent, params }) {
    const { lang } = await parent();
    const { type } = params;

    const res = await fetch(`/api/${lang}/${type}`);
    const items = await res.json();

    if (!items) throw error(404, "Type not found");

    return { items, lang, type };
}
