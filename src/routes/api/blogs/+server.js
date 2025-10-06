import { createItem } from "$lib/server/utils/items/itemsService"; // путь к твоему универсальному файлу
import { blogSteps } from "$lib/components/admin/fields/blogs";
import { blogSchema } from "$lib/schemas/blogSchemas";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const body = await request.json();
        // Валидация через Zod
        const parsed = blogSchema.safeParse(body);
        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }

        const slug = await createItem(parsed.data, "blogs", blogSteps);

        return json({ success: true, slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании статьи блога:", err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
