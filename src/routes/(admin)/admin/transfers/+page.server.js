// load-функция (сервер)
import { connectToDatabase } from "$lib/server/mongodb";

export async function load() {
    const db = await connectToDatabase();

    const transfers = await db
        .collection("transfers")
        .find(
            {},
            {
                projection: { _id: 0, slug: 1, active: 1, price: 1 },
            }
        )
        .toArray();

    const translations = await db
        .collection("transfers_translations")
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

    const mappedTransfers = transfers.map((e) => ({
        slug: e.slug,
        active: e.active,
        price: e.price,
        title_ru: translationsMap.get(e.slug) || "",
    }));

    return {
        items: mappedTransfers,
    };
}
