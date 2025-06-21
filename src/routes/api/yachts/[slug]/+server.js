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

    // Получаем полный объект яхты с клиента (включая мультиязычные поля)
    const yachtData = await request.json();

    // Старый и новый slug (идентификаторы яхты)
    const oldSlug = params.slug;
    const newSlug = yachtData.slug;

    // Формируем массив переводов для коллекции yachts_translations,
    // извлекая языковые поля из yachtData по каждому языку
    const preparedTranslations = ["ru", "en", "tr"].map((lang) => ({
        itemSlug: newSlug, // связываем перевод с новым slug
        lang, // язык перевода
        title: yachtData.title?.[lang] ?? "",
        description: yachtData.description?.[lang] ?? "",
        metaDescription: yachtData.metaDescription?.[lang] ?? "",
        whatYouSee: yachtData.whatYouSee?.[lang] ?? [],
        tags: yachtData.tags?.[lang] ?? [],
        meetingPoint: yachtData.meetingPoint?.[lang] ?? "",
        includes: yachtData.includes?.[lang] ?? [],
        whatToBring: yachtData.whatToBring?.[lang] ?? [],
    }));

    // Создаём объект для основной коллекции yachts —
    // копируем все поля, кроме мультиязычных
    const yacht = { ...yachtData };
    delete yacht.title;
    delete yacht.description;
    delete yacht.metaDescription;
    delete yacht.whatYouSee;
    delete yacht.includes;
    delete yacht.whatToBring;
    delete yacht.meetingPoint;
    delete yacht.tags;

    // Обновляем основной документ в коллекции yachts по старому slug
    await db.collection("yachts").updateOne({ slug: oldSlug }, { $set: yacht });

    // Удаляем все старые переводы из коллекции yachts_translations
    await db
        .collection("yachts_translations")
        .deleteMany({ itemSlug: oldSlug });

    // Вставляем новые переводы
    await db.collection("yachts_translations").insertMany(preparedTranslations);

    // Если slug изменился, обновляем его в основном документе
    if (oldSlug !== newSlug) {
        await db
            .collection("yachts")
            .updateOne({ slug: oldSlug }, { $set: { slug: newSlug } });
    }

    // Возвращаем успех
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
