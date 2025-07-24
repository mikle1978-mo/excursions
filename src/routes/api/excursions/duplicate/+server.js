import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";

export async function POST({ request }) {
    const { slug } = await request.json();
    const db = await connectToDatabase();

    // Получаем оригинальную экскурсию
    const excursion = await db.collection("excursions").findOne({ slug });
    if (!excursion) {
        return new Response(JSON.stringify({ error: "Экскурсия не найдена" }), {
            status: 404,
        });
    }

    // Генерация нового slug
    const newSlug = `${slug}-copy-${Date.now()}`;
    const newExcursion = { ...excursion, slug: newSlug };
    delete newExcursion._id;

    // Вставка новой экскурсии
    await db.collection("excursions").insertOne(newExcursion);

    // Получение переводов
    const translations = await db
        .collection("excursions_translations")
        .find({ itemSlug: slug })
        .toArray();

    // Подготовка переводов с новым itemSlug
    const newTranslations = translations.map(({ _id, ...rest }) => ({
        ...rest,
        itemSlug: newSlug,
    }));

    // Вставка переводов
    if (newTranslations.length > 0) {
        await db
            .collection("excursions_translations")
            .insertMany(newTranslations);
    }

    await redis.del("excursions");
    return new Response(JSON.stringify({ success: true, newSlug }), {
        status: 200,
    });
}
