import { connectToDatabase } from "$lib/server/mongodb";

export async function GET({ params }) {
    const db = await connectToDatabase();
    const excursion = await db
        .collection("excursions")
        .findOne({ slug: params.slug });
    const translation = await db
        .collection("excursions_translations")
        .find({ tourSlug: params.slug })
        .toArray();

    if (!excursion) return new Response(null, { status: 404 });

    return new Response(JSON.stringify({ excursion, translation }), {
        status: 200,
    });
}

export async function PUT({ request, params }) {
    const db = await connectToDatabase();
    const { excursion, translations } = await request.json();

    const oldSlug = params.slug;
    const newSlug = excursion.slug;

    // Обновим основной документ
    await db
        .collection("excursions")
        .updateOne({ slug: oldSlug }, { $set: excursion });

    // Удалим переводы по старому slug
    await db
        .collection("excursions_translations")
        .deleteMany({ tourSlug: oldSlug });

    // Подготовим переводы для нового slug
    const preparedTranslations = ["ru", "en", "tr"].map((lang) => {
        const t = translations.find((t) => t.lang === lang) ?? {};
        return {
            tourSlug: newSlug,
            lang,
            title: t.title ?? "",
            description: t.description ?? "",
            metaDescription: t.metaDescription ?? "",
            whatYouSee: t.whatYouSee ?? [],
            tags: t.tags ?? [],
            meetingPoint: t.meetingPoint ?? "",
            includes: t.includes ?? [],
            whatToBring: t.whatToBring ?? [],
        };
    });

    await db
        .collection("excursions_translations")
        .insertMany(preparedTranslations);

    // Также можно обновить slug в основном документе, если он изменился
    if (oldSlug !== newSlug) {
        await db
            .collection("excursions")
            .updateOne({ slug: oldSlug }, { $set: { slug: newSlug } });
    }

    return new Response(JSON.stringify({ success: true }));
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удалим саму экскурсию
    await db.collection("excursions").deleteOne({ slug: params.slug });

    // Удалим переводы этой экскурсии
    await db
        .collection("excursions_translations")
        .deleteMany({ tourSlug: params.slug });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
