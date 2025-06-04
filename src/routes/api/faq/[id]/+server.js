import { json } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "$lib/server/mongodb";

export async function GET({ params }) {
    const id = params.id;
    if (!ObjectId.isValid(id)) {
        return json({ error: "Некорректный ID" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const faq = await db.collection("faqs").findOne({ _id: new ObjectId(id) });

    if (!faq) {
        return json({ error: "FAQ не найден" }, { status: 404 });
    }

    return json(faq);
}

export async function PUT({ params, request }) {
    const id = params.id;
    if (!ObjectId.isValid(id)) {
        return json({ error: "Некорректный ID" }, { status: 400 });
    }

    const data = await request.json();

    // if (!data.question || !data.answer) {
    //     return json({ error: "Вопрос и ответ обязательны" }, { status: 400 });
    // }

    const db = await connectToDatabase();

    const updateResult = await db.collection("faqs").updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                question: data.question,
                answer: data.answer,
                order: data.order || 0,
                updatedAt: new Date(),
            },
        }
    );

    if (updateResult.matchedCount === 0) {
        return json({ error: "FAQ не найден" }, { status: 404 });
    }

    return json({ success: true });
}

export async function DELETE({ params }) {
    const id = params.id;
    if (!ObjectId.isValid(id)) {
        return json({ error: "Некорректный ID" }, { status: 400 });
    }

    const db = await connectToDatabase();

    const deleteResult = await db
        .collection("faqs")
        .deleteOne({ _id: new ObjectId(id) });

    if (deleteResult.deletedCount === 0) {
        return json({ error: "FAQ не найден" }, { status: 404 });
    }

    return json({ success: true });
}
