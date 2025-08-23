// src/lib/server/utils/fetchItems.js
import { connectToDatabase } from "$lib/server/mongodb";
import { LIST_FIELDS } from "$lib/constants/listAdminFields";

export async function fetchItems({ type, lang = "ru" }) {
    const db = await connectToDatabase();

    const collection = await db
        .collection(type)
        .find({}, { projection: LIST_FIELDS.main })
        .toArray();

    const translations = await db
        .collection(`${type}_translations`)
        .find({ lang }, { projection: LIST_FIELDS.translation })
        .toArray();

    const translationsMap = new Map(
        translations.map((t) => [t.itemSlug, t.title])
    );

    return {
        items: collection.map((item) => ({
            ...item,
            title_ru: translationsMap.get(item.slug) || "",
        })),
    };
}
