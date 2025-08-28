import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";

export async function POST({ request }) {
    const { slug } = await request.json();
    const db = await connectToDatabase();

    // Получаем оригинальную экскурсию
    const place = await db.collection("places").findOne({ slug });
    if (!place) {
        return new Response(JSON.stringify({ error: "Место не найдено" }), {
            status: 404,
        });
    }

    // Генерация нового slug
    const newSlug = `${slug}-copy-${Date.now()}`;
    const newPlace = { ...place, slug: newSlug };
    delete newPlace._id;

    // Вставка новой экскурсии
    await db.collection("places").insertOne(newPlace);

    // Получение переводов
    const translations = await db
        .collection("places_translations")
        .find({ itemSlug: slug })
        .toArray();

    // Подготовка переводов с новым itemSlug
    const newTranslations = translations.map(({ _id, ...rest }) => ({
        ...rest,
        itemSlug: newSlug,
    }));

    // Вставка переводов
    if (newTranslations.length > 0) {
        await db.collection("places_translations").insertMany(newTranslations);
    }

    await redis.del("places");
    return new Response(JSON.stringify({ success: true, newSlug }), {
        status: 200,
    });
}
