import { connectToDatabase } from "$lib/server/db/mongodb";
import { invalidateCache } from "$lib/server/cache/invalidateAfterChange.js";

export async function deleteItemFromDB(slug, type) {
    console.log(slug, type);

    const db = await connectToDatabase();
    await db.collection(type).deleteOne({ slug });
    await db.collection(`${type}_translations`).deleteMany({ itemSlug: slug });

    await invalidateCache(type, slug);
    return true;
}
