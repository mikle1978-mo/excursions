import { connectToDatabase } from "$lib/server/db/mongodb";
import { redis } from "$lib/server/db/redis";

export async function POST({ request }) {
    const { slug } = await request.json();
    const db = await connectToDatabase();

    // Получаем оригинальную статью
    const blog = await db.collection("blogs").findOne({ slug });
    if (!blog) {
        return new Response(JSON.stringify({ error: "Статья не найдена" }), {
            status: 404,
        });
    }

    // Генерация нового slug
    const newSlug = `${slug}-copy-${Date.now()}`;
    const newBlog = { ...blog, slug: newSlug };
    delete newBlog._id;

    // Вставка новой статьи
    await db.collection("blogs").insertOne(newBlog);

    // Получение переводов
    const translations = await db
        .collection("blogs_translations")
        .find({ itemSlug: slug })
        .toArray();

    // Подготовка переводов с новым itemSlug
    const newTranslations = translations.map(({ _id, ...rest }) => ({
        ...rest,
        itemSlug: newSlug,
    }));

    // Вставка переводов
    if (newTranslations.length > 0) {
        await db.collection("blogs_translations").insertMany(newTranslations);
    }

    await redis.del("blogs");
    return new Response(JSON.stringify({ success: true, newSlug }), {
        status: 200,
    });
}
