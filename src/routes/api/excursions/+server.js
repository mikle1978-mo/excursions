import { connectToDatabase } from "$lib/server/mongodb";

export async function GET() {
    const db = await connectToDatabase();
    const excursions = await db.collection("excursions").find({}).toArray();
    return new Response(JSON.stringify(excursions), { status: 200 });
}

export async function POST({ request }) {
    const data = await request.json();
    const db = await connectToDatabase();

    // Очистка и дефолты
    const cleaned = {
        slug: (data.slug || "").trim(),
        start: data.start || "08:00",
        duration: parseFloat(data.duration) || "",
        distance: parseFloat(data.distance) || "",
        groupSize: parseInt(data.groupSize) || 1,
        price: parseFloat(data.price) || 0,
        discount: parseFloat(data.discount) || 0,
        days:
            Array.isArray(data.days) && data.days.length > 0
                ? data.days
                : [1, 2, 3, 4, 5, 6, 7],
        images:
            Array.isArray(data.images) && data.images.length > 0
                ? data.images
                : ["/images/excursions/excursion_default.webp"],
        rating: 0,
        reviewsCount: 0,
        createdAt: new Date(),
    };

    // Вставка основного документа
    const result = await db.collection("excursions").insertOne(cleaned);

    // Подготовка переводов
    const translations = ["ru", "en", "tr"].map((lang) => ({
        tourSlug: cleaned.slug,
        lang,
        title: (data.title?.[lang] || "").trim(),
        metaDescription: (data.metaDescription?.[lang] || "").trim(),
        description: (data.description?.[lang] || "").trim(),
        whatYouSee: Array.isArray(data.whatYouSee?.[lang])
            ? data.whatYouSee[lang].filter(Boolean)
            : [],
        labels: Array.isArray(data.labels?.[lang])
            ? data.labels[lang].filter(Boolean)
            : [],
        categories: Array.isArray(data.categories?.[lang])
            ? data.categories[lang].filter(Boolean)
            : [],
        tags: Array.isArray(data.tags?.[lang])
            ? data.tags[lang].filter(Boolean)
            : [],
        meetingPoint: (data.meetingPoint?.[lang] || "").trim(),
        includes: Array.isArray(data.includes?.[lang])
            ? data.includes[lang].filter(Boolean)
            : [],
        whatToBring: Array.isArray(data.whatToBring?.[lang])
            ? data.whatToBring[lang].filter(Boolean)
            : [],
    }));

    await db.collection("excursions_translations").insertMany(translations);

    return new Response(JSON.stringify({ success: true, slug: cleaned.slug }), {
        status: 201,
    });
}
