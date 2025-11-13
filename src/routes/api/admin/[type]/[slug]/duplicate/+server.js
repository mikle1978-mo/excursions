import { json } from "@sveltejs/kit";
import { duplicateItem } from "$lib/server/services/admin/duplicateItem.js";

export async function POST({ params }) {
    const { type, slug } = params;
    console.log("params", params);

    try {
        const newSlug = await duplicateItem(slug, type);
        return json({ success: true, newSlug });
    } catch (err) {
        console.error(`Ошибка при дублировании ${type}:`, err);
        return json(
            { error: err.message || "Ошибка сервера" },
            { status: 500 }
        );
    }
}
