// src/lib/server/services/admin/toggleActiveItem.js
import { connectToDatabase } from "$lib/server/db/mongodb";
import { invalidateCache } from "$lib/server/cache/invalidateAfterChange.js";

export async function toggleActiveItem(slug, type) {
    const db = await connectToDatabase();

    // Получаем текущий item
    const item = await db.collection(type).findOne({ slug });
    if (!item) throw new Error("Item not found");

    // Инвертируем active
    const newActive = !item.active;

    await db
        .collection(type)
        .updateOne(
            { slug },
            { $set: { active: newActive, updatedAt: new Date() } }
        );

    await invalidateCache(type, slug);

    return slug; // возвращаем slug для идентификации
}
