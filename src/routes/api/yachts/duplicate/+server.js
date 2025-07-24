import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";
export async function POST({ request }) {
    const { slug } = await request.json();
    const db = await connectToDatabase();

    // Получаем оригинальную экскурсию
    const yacht = await db.collection("yachts").findOne({ slug });
    if (!yacht) {
        return new Response(JSON.stringify({ error: "Яхта не найдена" }), {
            status: 404,
        });
    }

    // Генерация нового slug
    const newSlug = `${slug}-copy-${Date.now()}`;
    const newYacht = { ...yacht, slug: newSlug };
    delete newYacht._id;

    // Вставка новой яхты
    await db.collection("yachts").insertOne(newYacht);

    // Получение переводов
    const translations = await db
        .collection("yachts_translations")
        .find({ itemSlug: slug })
        .toArray();

    // Подготовка переводов с новым itemSlug
    const newTranslations = translations.map(({ _id, ...rest }) => ({
        ...rest,
        itemSlug: newSlug,
    }));

    // Вставка переводов
    if (newTranslations.length > 0) {
        await db.collection("yachts_translations").insertMany(newTranslations);
    }
    await redis.del("yachts");
    return new Response(JSON.stringify({ success: true, newSlug }), {
        status: 200,
    });
}
