import { connectToDatabase } from "$lib/server/mongodb";

export async function GET({ params }) {
    const db = await connectToDatabase();
    const excursion = await db
        .collection("excursions")
        .findOne({ slug: params.slug });
    const translation = await db
        .collection("excursions_translations")
        .find({ itemSlug: params.slug })
        .toArray();

    if (!excursion) return new Response(null, { status: 404 });

    return new Response(JSON.stringify({ excursion, translation }), {
        status: 200,
    });
}

export async function PUT({ request, params }) {
    const db = await connectToDatabase();

    // Получаем полный объект яхты с клиента (включая мультиязычные поля)
    const excursionData = await request.json();

    // Старый и новый slug (идентификаторы яхты)
    const oldSlug = params.slug;
    const newSlug = excursionData.slug;

    // Формируем массив переводов для коллекции excursions_translations,
    // извлекая языковые поля из excursionData по каждому языку
    const preparedTranslations = ["ru", "en", "tr"].map((lang) => ({
        itemSlug: newSlug, // связываем перевод с новым slug
        lang, // язык перевода
        title: excursionData.title?.[lang] ?? "",
        description: excursionData.description?.[lang] ?? "",
        metaDescription: excursionData.metaDescription?.[lang] ?? "",
        whatYouSee: excursionData.whatYouSee?.[lang] ?? [],
        tags: excursionData.tags?.[lang] ?? [],
        meetingPoint: excursionData.meetingPoint?.[lang] ?? "",
        includes: excursionData.includes?.[lang] ?? [],
        whatToBring: excursionData.whatToBring?.[lang] ?? [],
    }));

    // Создаём объект для основной коллекции excursions —
    // копируем все поля, кроме мультиязычных
    const excursion = { ...excursionData };
    delete excursion.title;
    delete excursion.description;
    delete excursion.metaDescription;
    delete excursion.whatYouSee;
    delete excursion.includes;
    delete excursion.whatToBring;
    delete excursion.meetingPoint;
    delete excursion.tags;

    // Обновляем основной документ в коллекции excursions по старому slug
    await db
        .collection("excursions")
        .updateOne({ slug: oldSlug }, { $set: excursion });

    // Удаляем все старые переводы из коллекции excursions_translations
    await db
        .collection("excursions_translations")
        .deleteMany({ itemSlug: oldSlug });

    // Вставляем новые переводы
    await db
        .collection("excursions_translations")
        .insertMany(preparedTranslations);

    // Если slug изменился, обновляем его в основном документе
    if (oldSlug !== newSlug) {
        await db
            .collection("excursions")
            .updateOne({ slug: oldSlug }, { $set: { slug: newSlug } });
    }

    // Возвращаем успех
    return new Response(JSON.stringify({ success: true }));
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удалим саму экскурсию
    await db.collection("excursions").deleteOne({ slug: params.slug });

    // Удалим переводы этой экскурсии
    await db
        .collection("excursions_translations")
        .deleteMany({ itemSlug: params.slug });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
