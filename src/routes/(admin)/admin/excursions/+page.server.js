import { fetchItems } from "$lib/server/utils/items/fetchAdminItems";

export async function load() {
    return fetchItems({ type: "excursions" });
}
