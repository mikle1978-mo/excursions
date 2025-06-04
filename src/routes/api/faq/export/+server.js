import { connectToDatabase } from "$lib/server/mongodb";

export async function GET() {
    const db = await connectToDatabase();
    const faqs = await db.collection("faqs").find({}).toArray();

    const normalizedFaqs = faqs.map((faq) => ({
        ...faq,
        order: faq.order ?? 0,
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
    }));

    return new Response(JSON.stringify(normalizedFaqs), {
        headers: {
            "Content-Type": "application/json",
            "Content-Disposition": 'attachment; filename="faqs-export.json"',
        },
    });
}
