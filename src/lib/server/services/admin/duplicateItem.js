// src/lib/server/services/admin/duplicateItem.js
import { connectToDatabase } from "$lib/server/db/mongodb";
import { redis } from "$lib/server/db/redis";
import { invalidateListCache } from "$lib/server/services/shared/invalidateListCache";
import { invalidateFullItemCache } from "$lib/server/services/shared/invalidateFullItemCache";

export async function duplicateItem(slug, type) {
    const db = await connectToDatabase();

    const item = await db.collection(type).findOne({ slug });
    if (!item) throw new Error("Item not found");

    const newSlug = `${slug}-copy-${Date.now()}`;
    const newItem = {
        ...item,
        slug: newSlug,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    };
    delete newItem._id;

    await db.collection(type).insertOne(newItem);

    const translations = await db
        .collection(`${type}_translations`)
        .find({ itemSlug: slug })
        .toArray();

    const newTranslations = translations.map(({ _id, ...rest }) => ({
        ...rest,
        itemSlug: newSlug,
    }));

    if (newTranslations.length > 0) {
        await db.collection(`${type}_translations`).insertMany(newTranslations);
    }

    await invalidateListCache(type);
    await invalidateFullItemCache(slug, type);

    return newSlug;
}
