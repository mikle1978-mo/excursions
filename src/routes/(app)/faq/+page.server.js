import { connectToDatabase } from "$lib/server/mongodb";

export async function load({ params }) {
    const lang = params.lang || "en";
    const db = await connectToDatabase();
    const collection = db.collection("faqs");

    const faqs = await collection.find({}).sort({ order: 1 }).toArray();

    const localizedFaqs = faqs.map((faq) => ({
        question: faq.question?.[lang] ?? faq.question?.ru ?? "",
        answer: faq.answer?.[lang] ?? faq.answer?.ru ?? "",
    }));

    return {
        faqs: localizedFaqs,
    };
}
