import { createItemInDB } from "$lib/server/utils/items/itemsService"; // путь к твоему универсальному файлу
import { placeSteps } from "$lib/components/admin/fields/places";
import { placeSchema } from "$lib/schemas/placeSchema";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const body = await request.json();
        // Валидация через Zod
        const parsed = placeSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }

        const slug = await createItemInDB(parsed.data, "places", placeSteps);

        return json({ success: true, slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании экскурсии:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
