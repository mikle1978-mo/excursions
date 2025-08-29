import { getFullItemCached } from "$lib/server/utils/items/itemsService";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { lang, slug } = params;

    return await getFullItemCached(slug, "yachts", lang);
}
