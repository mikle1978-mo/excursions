import {
    publishToAllSocial,
    updateAllSocial,
    deleteAllSocial,
} from "$lib/server/social/index.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const data = await request.json();
        await publishToAllSocial(data);
        return json({ success: true });
    } catch (err) {
        console.error("Ошибка публикации:", err);
        return json({ success: false, error: err.message });
    }
}

export async function PATCH({ request }) {
    try {
        const data = await request.json();
        await updateAllSocial(data);
        return json({ success: true });
    } catch (err) {
        console.error("Ошибка обновления:", err);
        return json({ success: false, error: err.message });
    }
}

export async function DELETE({ request }) {
    try {
        const data = await request.json();
        await deleteAllSocial(data);
        return json({ success: true });
    } catch (err) {
        console.error("Ошибка удаления:", err);
        return json({ success: false, error: err.message });
    }
}
