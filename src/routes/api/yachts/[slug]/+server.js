import { connectToDatabase } from "$lib/server/mongodb";

export async function GET({ params }) {
    const db = await connectToDatabase();
    const yacht = await db.collection("yachts").findOne({ slug: params.slug });
    const translation = await db
        .collection("yachts_translations")
        .find({ itemSlug: params.slug })
        .toArray();

    if (!yacht) return new Response(null, { status: 404 });

    return new Response(JSON.stringify({ yacht, translation }), {
        status: 200,
    });
}

export async function PUT({ request, params }) {
    const db = await connectToDatabase();
    const { yacht, translations } = await request.json();

    const oldSlug = params.slug;
    const newSlug = yacht.slug;

    // Обновим основной документ
    await db.collection("yachts").updateOne({ slug: oldSlug }, { $set: yacht });

    // Удалим переводы по старому slug
    await db
        .collection("yachts_translations")
        .deleteMany({ itemSlug: oldSlug });

    // Подготовим переводы для нового slug
    const preparedTranslations = ["ru", "en", "tr"].map((lang) => {
        const t = translations.find((t) => t.lang === lang) ?? {};
        return {
            itemSlug: newSlug,
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

    await db.collection("yachts_translations").insertMany(preparedTranslations);

    // Также можно обновить slug в основном документе, если он изменился
    if (oldSlug !== newSlug) {
        await db
            .collection("yachts")
            .updateOne({ slug: oldSlug }, { $set: { slug: newSlug } });
    }

    return new Response(JSON.stringify({ success: true }));
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удалим саму экскурсию
    await db.collection("yachts").deleteOne({ slug: params.slug });

    // Удалим переводы этой экскурсии
    await db
        .collection("yachts_translations")
        .deleteMany({ itemSlug: params.slug });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
