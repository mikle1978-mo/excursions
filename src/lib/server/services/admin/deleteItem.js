import { connectToDatabase } from "$lib/server/db/mongodb";
import { redis } from "$lib/server/db/redis";
import { flattenFields } from "$lib/server/services/shared/flattenFields";
import { isLocalizedField } from "$lib/server/services/shared/isLocalizedField";
import { invalidateListCache } from "$lib/server/services/shared/invalidateListCache";
import { invalidateFullItemCache } from "$lib/server/services/shared/invalidateFullItemCache";

export async function deleteItemFromDB(slug, collectionName) {
    console.log(slug, collectionName);

    const db = await connectToDatabase();
    await db.collection(collectionName).deleteOne({ slug });
    await db
        .collection(`${collectionName}_translations`)
        .deleteMany({ itemSlug: slug });
    await redis.del(collectionName);
    await invalidateListCache(collectionName);
    await invalidateFullItemCache(slug, collectionName);
    return true;
}
