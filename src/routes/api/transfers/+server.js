import { createItem } from "$lib/server/utils/items/itemsService"; // путь к твоему универсальному файлу
import { transferSteps } from "$lib/components/admin/fields/transfers";
import { transferSchema } from "$lib/schemas/transferSchema";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const body = await request.json();
        // Валидация через Zod
        const parsed = transferSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }

        const slug = await createItem(parsed.data, "transfers", transferSteps);

        return json({ success: true, slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании трансфера:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
