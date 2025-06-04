import { json } from "@sveltejs/kit";
import { connectToDatabase } from "$lib/server/mongodb";

export async function GET() {
    const db = await connectToDatabase();
    const faqs = await db
        .collection("faqs")
        .find()
        .sort({ order: 1 })
        .toArray();
    return json(faqs);
}

export async function POST({ request }) {
    const data = await request.json();

    if (!data.question || !data.answer) {
        return json({ error: "Вопрос и ответ обязательны" }, { status: 400 });
    }

    const db = await connectToDatabase();

    const faq = {
        question: data.question,
        answer: data.answer,
        order: data.order || 0,
        createdAt: new Date(),
    };

    const result = await db.collection("faqs").insertOne(faq);
    return json({ id: result.insertedId, ...faq });
}
