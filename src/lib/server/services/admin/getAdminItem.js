import { connectToDatabase } from "$lib/server/db/mongodb";
import { collectionsConfig } from "$lib/config/app.config";
import { normalizeMongoData } from "$lib/utils/normalizeMongoData.js";
import { createInitialFormFromConfig } from "$lib/utils/createInitialFormFromConfig.js";

/**
 * Получение элемента для админки с учетом всей формы
 */
export async function getAdminItem(type, slug) {
    const config = collectionsConfig[type];
    if (!config) throw new Error(`Неизвестный тип коллекции: ${type}`);

    const db = await connectToDatabase();
    const formConfig = config.formConfig;

    // создаём дефолты
    const defaultItem = createInitialFormFromConfig(formConfig);
    if (!slug) return defaultItem; // новый элемент

    // Берем основной документ (не локализованные поля)
    const mainProjection = {};
    formConfig
        .flatMap((s) => s.fields)
        .filter((f) => !f.localized)
        .forEach((f) => (mainProjection[f.name] = 1));
    mainProjection.slug = 1;
    mainProjection._id = 1;

    let mainItem = await db
        .collection(type)
        .findOne({ slug }, { projection: mainProjection });
    mainItem = normalizeMongoData(mainItem);

    // Определяем локализованные поля
    const localizedFields = formConfig
        .flatMap((s) => s.fields)
        .filter((f) => f.localized)
        .map((f) => f.name);

    let translations = {};
    if (localizedFields.length > 0) {
        const translationProjection = { itemSlug: 1, lang: 1 };
        localizedFields.forEach((f) => (translationProjection[f] = 1));

        const translationDocs = await db
            .collection(`${type}_translations`)
            .find({ itemSlug: slug }, { projection: translationProjection })
            .toArray();

        // Собираем объект вида: title: { en: "...", ru: "..." }
        translations = {};
        localizedFields.forEach((f) => {
            translations[f] = {};
            translationDocs.forEach((doc) => {
                const normDoc = normalizeMongoData(doc);
                translations[f][normDoc.lang] = normDoc[f] ?? "";
            });
        });
    }

    // Собираем итоговый объект
    return { ...defaultItem, ...mainItem, ...translations };
}
