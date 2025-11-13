// src/routes/(admin)/admin/[type]/+page.server.js
import { json } from "@sveltejs/kit";

/**
 * Load для админки: просто обращаемся к API
 */

export async function load({ params, fetch }) {
    const { type } = params;

    try {
        const res = await fetch(`/api/admin/${type}`);
        if (!res.ok) throw new Error("Ошибка при загрузке данных");

        const { data, meta } = await res.json();

        return {
            listData: {
                type,
                items: data,
                meta,
            },
        };
    } catch (err) {
        console.error("Ошибка в load админки:", err);
        return {
            listData: { type, items: [], meta: { total: 0 } },
        };
    }
}
