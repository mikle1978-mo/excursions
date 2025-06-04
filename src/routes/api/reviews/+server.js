import { json } from "@sveltejs/kit";
import { connectToDatabase } from "$lib/server/mongodb";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, getClientAddress }) {
    try {
        const ip = getClientAddress();

        const { tourSlug, name, rating, comment } = await request.json();

        if (!tourSlug || !name || !comment || !rating) {
            return json(
                { error: "Отсутствуют обязательные поля" },
                { status: 400 }
            );
        }

        // Подключаемся к базе
        const db = await connectToDatabase();
        const reviewsCollection = db.collection("reviews");

        // Проверяем, есть ли уже отзыв с этим IP для данного тура
        const existingReview = await reviewsCollection.findOne({
            tourSlug,
            ip,
        });

        if (existingReview) {
            return json(
                {
                    error: "Вы уже оставили отзыв для этой экскурсии с этого IP",
                },
                { status: 403 }
            );
        }

        // Создаем новый отзыв
        const newReview = {
            tourSlug,
            name,
            rating,
            comment,
            ip,
            createdAt: new Date(),
        };

        const result = await reviewsCollection.insertOne(newReview);

        if (!result.acknowledged) {
            return json(
                { error: "Ошибка при сохранении отзыва" },
                { status: 500 }
            );
        }

        // Возвращаем сохраненный отзыв с _id
        return json({ ...newReview, _id: result.insertedId });
    } catch (error) {
        console.error("Ошибка API /reviews:", error);
        return json({ error: "Внутренняя ошибка сервера" }, { status: 500 });
    }
}
