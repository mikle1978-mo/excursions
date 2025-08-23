// src/routes/api/yachts/[slug]/+server.js
import { json } from "@sveltejs/kit";
import { yachtSteps } from "$lib/components/admin/fields/yachts";
import {
    getItem,
    updateItem,
    deleteItem,
} from "$lib/server/utils/items/itemsService";

/**
 * Получение яхты по slug
 */
export async function GET({ params }) {
    try {
        const result = await getItem(params.slug, "yachts");
        if (!result.item) return new Response(null, { status: 404 });

        return json(result, { status: 200 });
    } catch (err) {
        console.error("Ошибка при получении яхты:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

/**
 * Обновление яхты
 */
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const slug = await updateItem(params.slug, data, "yachts", yachtSteps);
        return json({ success: true, slug }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при обновлении яхты:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}

/**
 * Удаление яхты
 */
export async function DELETE({ params }) {
    try {
        await deleteItem(params.slug, "yachts");
        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при удалении яхты:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
