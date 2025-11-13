import { connectToDatabase } from "$lib/server/db/mongodb";
import { collectionsConfig } from "$lib/config/app.config";

/**
 * Получение списка элементов для админки
 * @param {string} type - тип коллекции (excursion, car, yacht и т.д.)
 * @param {string} lang - язык локализации (ru, en и т.д.)
 * @returns {Promise<{ data: Array, meta: { total: number } }>}
 */
export async function getAdminList(type, lang = "ru") {
    // Получаем конфиг коллекции
    const config = collectionsConfig[type];

    if (!config) throw new Error(`Неизвестный тип коллекции: ${type}`);

    const db = await connectToDatabase();
    const listFields = config.adminListConfig?.fields || [];

    // разделяем поля
    const mainFields = listFields.filter((f) => !f.lang).map((f) => f.name);
    const translationFields = listFields
        .filter((f) => f.lang)
        .map((f) => f.name);

    // projection для основной коллекции
    const mainProjection = {};
    mainFields.forEach((f) => (mainProjection[f] = 1));
    mainProjection.slug = 1;
    mainProjection._id = 1;

    const mainItems = await db
        .collection(type)
        .find({}, { projection: mainProjection })
        .toArray();

    if (translationFields.length === 0) {
        return { data: mainItems, meta: { total: mainItems.length } };
    }

    // projection для переводов — обязательно добавляем itemSlug
    const translationProjection = translationFields.reduce((acc, f) => {
        acc[f] = 1;
        return acc;
    }, {});
    translationProjection.itemSlug = 1;

    const translations = await db
        .collection(`${type}_translations`)
        .find({ lang }, { projection: translationProjection })
        .toArray();

    const translationsMap = new Map(translations.map((t) => [t.itemSlug, t]));

    // объединяем
    const data = mainItems.map((item) => {
        const merged = { ...item };
        translationFields.forEach((f) => {
            merged[f] = translationsMap.get(item.slug)?.[f] ?? "";
        });
        return merged;
    });

    return { data, meta: { total: data.length } };
}
