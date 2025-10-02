// src/routes/api/blogs/[slug]/+server.js
import { json } from "@sveltejs/kit";
import { blogSteps } from "$lib/components/admin/fields/blog";
import {
    getItem,
    updateItem,
    deleteItem,
} from "$lib/server/utils/items/itemsService";

/**
 * Получение статьи по slug
 */
export async function GET({ params }) {
    try {
        const result = await getItem(params.slug, "blogs");
        if (!result.item) return new Response(null, { status: 404 });

        return json(result, { status: 200 });
    } catch (err) {
        console.error("Ошибка при получении статьи:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

/**
 * Обновление статьи
 */
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const slug = await updateItem(params.slug, data, "blogs", blogSteps);
        return json({ success: true, slug }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при обновлении статьи:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}

/**
 * Удаление статьи
 */
export async function DELETE({ params }) {
    try {
        await deleteItem(params.slug, "blogs");
        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при удалении статьи:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
