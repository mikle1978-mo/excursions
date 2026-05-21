import { error } from "@sveltejs/kit";
import { getFullItemCached } from "$lib/server/services/public/items/itemsService";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { slug, type, lang } = params;

    const dataCached = await getFullItemCached(slug, type, lang);

    if (!dataCached) {
        throw error(404, `${type} 444 not found"`);
    }

    let data = { ...dataCached, type, lang };

    return data;
}
