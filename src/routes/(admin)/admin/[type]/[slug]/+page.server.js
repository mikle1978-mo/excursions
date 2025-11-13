// src/routes/(admin)/admin/[type]/[slug]/+page.server.js
import { getAdminItem } from "$lib/server/services/admin/getAdminItem.js";

export async function load({ params }) {
    const item = await getAdminItem(params.type, params.slug);

    return {
        itemData: {
            type: params.type,
            item,
        },
    };
}
