import { createItemInDB } from "$lib/server/utils/items/itemsService"; // путь к твоему универсальному файлу
import { carSteps } from "$lib/components/admin/fields/cars";
import { carSchema } from "$lib/schemas/carSchema";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const body = await request.json();
        // Валидация через Zod
        const parsed = carSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }

        const slug = await createItemInDB(parsed.data, "cars", carSteps);

        return json({ success: true, slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании авто:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
