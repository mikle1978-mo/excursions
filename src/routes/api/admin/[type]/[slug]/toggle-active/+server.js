// src/routes/api/excursions/toggle-active/+server.js
import { json } from "@sveltejs/kit";
import { toggleActiveItem } from "$lib/server/services/admin/toggleActiveItem.js";

export async function PATCH({ params }) {
    const { type, slug } = params;

    try {
        const newActive = await toggleActiveItem(slug, type); // возвращаем новый active
        return json({ success: true, active: newActive });
    } catch (err) {
        console.error(`Ошибка при изменении активного статуса ${type}:`, err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
