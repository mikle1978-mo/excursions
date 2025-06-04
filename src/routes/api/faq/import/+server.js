import { json } from "@sveltejs/kit";
import { connectToDatabase } from "$lib/server/mongodb";
import { ObjectId } from "mongodb";

export async function POST({ request }) {
    let faqs;
    try {
        faqs = await request.json();
    } catch (e) {
        return json({ error: "Некорректный JSON" }, { status: 400 });
    }

    if (!Array.isArray(faqs)) {
        return json(
            { error: "Ожидается массив объектов FAQ" },
            { status: 400 }
        );
    }

    const db = await connectToDatabase();
    const collection = db.collection("faqs");

    let updatedCount = 0;
    let insertedCount = 0;
    let skippedCount = 0;

    for (const faq of faqs) {
        // Валидация
        if (!faq.question || !faq.answer || typeof faq.tourSlug !== "string") {
            skippedCount++;
            continue;
        }

        // Убедимся, что все языки заданы
        const normalizedFaq = {
            tourSlug: faq.tourSlug,
            question: {
                ru: faq.question?.ru ?? "",
                en: faq.question?.en ?? "",
                tr: faq.question?.tr ?? "",
            },
            answer: {
                ru: faq.answer?.ru ?? "",
                en: faq.answer?.en ?? "",
                tr: faq.answer?.tr ?? "",
            },
            order: faq.order ?? 0,
        };

        try {
            if (faq._id) {
                // Попробуем обновить
                const result = await collection.updateOne(
                    { _id: new ObjectId(faq._id) },
                    { $set: normalizedFaq },
                    { upsert: true }
                );

                if (result.matchedCount > 0) {
                    updatedCount++;
                } else {
                    insertedCount++;
                }
            } else {
                // Вставка новой записи
                await collection.insertOne(normalizedFaq);
                insertedCount++;
            }
        } catch (e) {
            console.error("Ошибка при обработке FAQ:", e);
            skippedCount++;
        }
    }

    return json({
        message: "Импорт завершён",
        updated: updatedCount,
        inserted: insertedCount,
        skipped: skippedCount,
        total: faqs.length,
    });
}
