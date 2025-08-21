import { connectToDatabase } from "$lib/server/mongodb";

export async function load() {
    const db = await connectToDatabase();
    const faqs = await db
        .collection("faqs")
        .find()
        .sort({ order: 1 })
        .toArray();

    return {
        faqs: faqs.map(({ _id, question, answer }) => ({
            _id: _id.toString(),
            question,
            answer,
        })),
    };
}
