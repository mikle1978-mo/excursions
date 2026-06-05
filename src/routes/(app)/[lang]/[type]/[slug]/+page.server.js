// src\routes\(app)\[lang]\[type]\[slug]\+page.server.js
import { error } from "@sveltejs/kit";
import { getFullItemCached } from "$lib/server/services/public/items/itemsService";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, fetch }) {
    const { slug, type, lang } = params;

    const dataCached = await getFullItemCached(slug, type, lang);

    if (!dataCached) {
        throw error(404, `${type} 404 not found`);
    }

    //list
    const res = await fetch(`/api/${lang}/${type}`);

    const items = await res.json();
    if (!items) {
        throw error(404, "Type not found");
    }
    const related = items.filter((item) => item.slug !== slug).slice(0, 20);

    let data = {
        ...dataCached,
        relatedItems: related,
        type,
        lang,
    };

    return data;
}
