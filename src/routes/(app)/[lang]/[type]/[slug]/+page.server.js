import { error } from "@sveltejs/kit";
import { getFullItemCached } from "$lib/server/services/public/items/itemsService";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { slug, type, lang } = params;

    const data = await getFullItemCached(slug, type, lang);

    if (!data) {
        throw error(404, `${type} 444 not found"`);
    }

    return data;
}
