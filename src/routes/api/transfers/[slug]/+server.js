// src/routes/api/transfers/[slug]/+server.js
import { json } from "@sveltejs/kit";
import { transferSteps } from "$lib/components/admin/fields/transfers";
import {
    getItem,
    updateItem,
    deleteItem,
} from "$lib/server/utils/items/itemsService";

/**
 * Получение трансфера по slug
 */
export async function GET({ params }) {
    try {
        const result = await getItem(params.slug, "transfers");
        if (!result.item) return new Response(null, { status: 404 });

        return json(result, { status: 200 });
    } catch (err) {
        console.error("Ошибка при получении трансфера:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

/**
 * Обновление трансфера
 */
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const slug = await updateItem(
            params.slug,
            data,
            "transfers",
            transferSteps
        );
        return json({ success: true, slug }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при обновлении трансфера:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}

/**
 * Удаление трансфера
 */
export async function DELETE({ params }) {
    try {
        await deleteItem(params.slug, "transfers");
        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при удалении трансфера:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
