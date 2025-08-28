// src/routes/api/places/[slug]/+server.js
import { json } from "@sveltejs/kit";
import { placeSteps } from "$lib/components/admin/fields/places";
import {
    getItem,
    updateItem,
    deleteItem,
} from "$lib/server/utils/items/itemsService";

/**
 * Получение места по slug
 */
export async function GET({ params }) {
    try {
        const result = await getItem(params.slug, "places");
        if (!result.item) return new Response(null, { status: 404 });

        return json(result, { status: 200 });
    } catch (err) {
        console.error("Ошибка при получении места:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

/**
 * Обновление места
 */
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const slug = await updateItem(params.slug, data, "places", placeSteps);
        return json({ success: true, slug }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при обновлении места:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}

/**
 * Удаление места
 */
export async function DELETE({ params }) {
    try {
        await deleteItem(params.slug, "places");
        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при удалении места:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
