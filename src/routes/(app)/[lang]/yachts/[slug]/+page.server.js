import { error } from "@sveltejs/kit";
import { getFullItemCached } from "$lib/server/utils/items/itemsService";

/** @type {import('./$types').PageServerLoad} */
export async function load(event) {
    const { params, route } = event;
    const { slug } = params;
    const lang = params.lang || "en";

    // ✅ Берём именно route.id, не route
    const type = route?.id?.split("/").filter(Boolean).at(-1).startsWith("[")
        ? route.id.split("/").filter(Boolean).at(-2)
        : route.id.split("/").filter(Boolean).at(-1);

    const data = await getFullItemCached(slug, type, lang);

    if (!data) {
        throw error(404, `${type} not found"`);
    }

    return data;
}
