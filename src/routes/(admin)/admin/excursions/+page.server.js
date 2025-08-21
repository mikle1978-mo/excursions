// load-функция (сервер)
import { connectToDatabase } from "$lib/server/mongodb";

export async function load() {
    const db = await connectToDatabase();

    const excursions = await db
        .collection("excursions")
        .find(
            {},
            {
                projection: { _id: 0, slug: 1, active: 1, price: 1 },
            }
        )
        .toArray();

    const translations = await db
        .collection("excursions_translations")
        .find(
            { lang: "ru" },
            {
                projection: { _id: 0, itemSlug: 1, title: 1 },
            }
        )
        .toArray();

    const translationsMap = new Map(
        translations.map((t) => [t.itemSlug, t.title])
    );

    const mappedExcursions = excursions.map((e) => ({
        slug: e.slug,
        active: e.active,
        price: e.price,
        title_ru: translationsMap.get(e.slug) || "",
    }));

    return {
        items: mappedExcursions,
    };
}
