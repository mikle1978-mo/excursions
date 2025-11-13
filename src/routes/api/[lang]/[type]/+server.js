import { collectionsConfig } from "$lib/config/app.config";
import { createItemInDB } from "$lib/server/services/public/items/itemsService";
import { json } from "@sveltejs/kit";

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

        const slug = await createItemInDB(
            parsed.data,
            config.collectionName,
            config.formConfig
        );

        return json({ success: true, slug }, { status: 201 });
    } catch (err) {
        console.error(err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
