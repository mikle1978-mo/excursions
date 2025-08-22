// src/routes/api/excursions/[slug]/+server.js
import { json } from "@sveltejs/kit";
import { excursionSteps } from "$lib/components/admin/fields/excursions";
import {
    getItem,
    updateItem,
    deleteItem,
} from "$lib/server/utils/items/itemsService";

/**
 * Получение экскурсии по slug
 */
export async function GET({ params }) {
    try {
        const result = await getItem(params.slug, "excursions");
        if (!result.item) return new Response(null, { status: 404 });

        return json(result, { status: 200 });
    } catch (err) {
        console.error("Ошибка при получении экскурсии:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

/**
 * Обновление экскурсии
 */
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const slug = await updateItem(
            params.slug,
            data,
            "excursions",
            excursionSteps
        );
        return json({ success: true, slug }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при обновлении экскурсии:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}

/**
 * Удаление экскурсии
 */
export async function DELETE({ params }) {
    try {
        await deleteItem(params.slug, "excursions");
        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при удалении экскурсии:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
