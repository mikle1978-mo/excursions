// src/routes/api/[type]/[slug]/+server.js
import { json } from "@sveltejs/kit";
// import { blogSteps as steps } from "$lib/admin/forms/blog.form"; // ← псевдоним
import { collectionsConfig } from "$lib/config/app.config.js";
import { mergeWithSchema } from "$lib/utils/mergeWithSchema";
import { mergeWithTranslations } from "$lib/utils/mergeWithTranslations";
import { getItemFromDB } from "$lib/server/services/public/items/itemsService";
import { updateItemInDB } from "$lib/server/services/admin/updateItem.js";
import { deleteItemFromDB } from "$lib/server/services/admin/deleteItem.js";
import {
    updateAllSocial,
    deleteAllSocial,
} from "$lib/server/services/shared/social/index.js";

/**
 * Получение места по slug
 */
export async function GET({ params }) {
    const typeParam = params.type;

    const config = Object.values(collectionsConfig).find(
        (c) => c.collectionName === typeParam
    );

    if (!config)
        return json({ error: "Unknown collection type" }, { status: 400 });

    const steps = config.formConfig;
    try {
        const result = await getItemFromDB(params.slug, typeParam);
        if (!result.item) return new Response(null, { status: 404 });

        // 🟢 Нормализуем по схеме
        const schemaFields = steps.flatMap((step) => step.fields);

        // 1️⃣ Объединяем перевод с item
        const itemWithTranslations = mergeWithTranslations(
            result.item,
            result.translation,
            schemaFields
        );

        // 2️⃣ Применяем mergeWithSchema
        const mergedItem = mergeWithSchema(schemaFields, itemWithTranslations);

        return json({ ...result, item: mergedItem }, { status: 200 });
    } catch (err) {
        console.error(`Ошибка при получении ${typeParam}:`, err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}

/**
 * Обновление
 */
export async function PUT({ request, params }) {
    const { type, slug } = params;

    const config = collectionsConfig[type];
    if (!config)
        return json({ error: "Unknown collection type" }, { status: 400 });

    const steps = config.formConfig;

    try {
        const data = await request.json();

        // ✅ получаем новый слаг, если он поменялся
        const newSlug = await updateItemInDB(slug, data, type, steps);

        await updateAllSocial({ ...data, slug: newSlug, type });

        return json({ success: true, slug: newSlug }, { status: 200 });
    } catch (err) {
        console.error(`Ошибка при обновлении ${type}:`, err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}

/**
 * Удаление
 */
export async function DELETE({ params }) {
    const { type, slug } = params;

    if (!collectionsConfig[type])
        return json({ error: `Unknown collection ${type}` }, { status: 400 });
    try {
        await deleteItemFromDB(slug, type);
        return json({ success: true }, { status: 200 });
    } catch (err) {
        console.error(`Ошибка при удалении ${type}:`, err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
