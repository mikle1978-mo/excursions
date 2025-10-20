import { error } from "@sveltejs/kit";
import { getFullItemCached } from "$lib/server/utils/items/itemsService";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { lang, slug } = params;

    const data = await getFullItemCached(slug, "yachts", lang);

    if (!data) {
        throw error(404, "Yacht not found");
    }

    return data;
}
