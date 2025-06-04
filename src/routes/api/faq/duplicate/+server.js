import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "$lib/server/mongodb";

export async function POST({ request }) {
    const { id } = await request.json();

    if (!id || !ObjectId.isValid(id)) {
        return json({ error: "Некорректный ID" }, { status: 400 });
    }

    const db = await connectToDatabase();

    const faq = await db.collection("faqs").findOne({ _id: new ObjectId(id) });
    if (!faq) {
        return json({ error: "FAQ не найден" }, { status: 404 });
    }

    // Удаляем _id, чтобы Mongo создал новый
    delete faq._id;

    // Можно изменить порядок или вопрос, например, добавить "(копия)" к вопросу
    faq.question = { ...faq.question };
    if (typeof faq.question === "object") {
        for (const key in faq.question) {
            faq.question[key] = faq.question[key] + " (копия)";
        }
    } else {
        faq.question = faq.question + " (копия)";
    }

    const result = await db.collection("faqs").insertOne(faq);

    return json({ newId: result.insertedId.toString() });
}
