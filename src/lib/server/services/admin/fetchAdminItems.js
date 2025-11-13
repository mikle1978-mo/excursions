import { connectToDatabase } from "$lib/server/db/mongodb";
import { collectionsConfig } from "$lib/config/app.config";

export async function fetchAdminItems({ type, lang = "ru" }) {
    const config = collectionsConfig[type];
    if (!config) throw new Error("Неизвестный тип");

    const db = await connectToDatabase();

    const mainItems = await db
        .collection(config.collectionName)
        .find({}, { projection: config.adminListConfig.main })
        .toArray();

    const translations = await db
        .collection(`${config.collectionName}_translations`)
        .find({ lang }, { projection: config.adminListConfig.translation })
        .toArray();

    const translationsMap = new Map(
        translations.map((t) => [t.itemSlug, t.title])
    );

    return mainItems.map((item) => ({
        ...item,
        title_ru: translationsMap.get(item.slug) || "",
    }));
}
