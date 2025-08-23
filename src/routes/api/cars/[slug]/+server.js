// src/routes/api/cars/[slug]/+server.js
import { json } from "@sveltejs/kit";
import { carSteps } from "$lib/components/admin/fields/cars";
import {
    getItem,
    updateItem,
    deleteItem,
} from "$lib/server/utils/items/itemsService";

/**
 * Получение авто по slug
 */
export async function GET({ params }) {
    try {
        const result = await getItem(params.slug, "cars");
        if (!result.item) return new Response(null, { status: 404 });

        return json(result, { status: 200 });
    } catch (err) {
        console.error("Ошибка при получении авто:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

/**
 * Обновление авто
 */
export async function PUT({ request, params }) {
    try {
        const data = await request.json();
        const slug = await updateItem(params.slug, data, "cars", carSteps);
        return json({ success: true, slug }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при обновлении авто:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}

/**
 * Удаление авто
 */
export async function DELETE({ params }) {
    try {
        await deleteItem(params.slug, "cars");
        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error("Ошибка при удалении авто:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
