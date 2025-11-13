// получить список сущностей для таблицы админки
// src/routes/api/admin/[type]/+server.js

import { json } from "@sveltejs/kit";
import { collectionsConfig } from "$lib/config/app.config";
import { getAdminList } from "$lib/server/services/admin/getAdminList";
import { createItemInDB } from "$lib/server/services/admin/createItem";

export async function GET({ params }) {
    const { type } = params;

    try {
        const items = await getAdminList(type); // передаём только type
        return json(items);
    } catch (err) {
        console.error(err);
        return json({ error: err.message }, { status: 500 });
    }
}

// создать новую сущность
export async function POST({ request, params }) {
    try {
        const { type } = params;
        const config = collectionsConfig[type];

        if (!config) return json({ error: "Неизвестный тип" }, { status: 400 });

        const body = await request.json();
        const parsed = config.schema.safeParse(body);

        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }

        const slug = await createItemInDB(parsed.data, type, config.formConfig);

        return json({ success: true, slug }, { status: 201 });
    } catch (err) {
        console.error(err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
