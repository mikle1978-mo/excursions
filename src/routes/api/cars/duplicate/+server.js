import { connectToDatabase } from "$lib/server/mongodb";

export async function POST({ request }) {
    const { slug } = await request.json();
    const db = await connectToDatabase();

    // Получаем оригинальную машину по slug
    const car = await db.collection("cars").findOne({ slug });
    if (!car) {
        return new Response(JSON.stringify({ error: "Машина не найдена" }), {
            status: 404,
        });
    }

    // Генерация нового slug
    const newSlug = `${slug}-copy-${Date.now()}`;
    const newCar = { ...car, slug: newSlug };
    delete newCar._id;

    // Вставка новой машины
    await db.collection("cars").insertOne(newCar);

    // Получение переводов
    const translations = await db
        .collection("cars_translations")
        .find({ itemSlug: slug })
        .toArray();

    // Подготовка переводов с новым itemSlug
    const newTranslations = translations.map(({ _id, ...rest }) => ({
        ...rest,
        itemSlug: newSlug,
    }));

    // Вставка переводов
    if (newTranslations.length > 0) {
        await db.collection("cars_translations").insertMany(newTranslations);
    }

    return new Response(JSON.stringify({ success: true, newSlug }), {
        status: 200,
    });
}
