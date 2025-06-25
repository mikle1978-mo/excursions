import { connectToDatabase } from "$lib/server/mongodb";

export async function GET({ params }) {
    const db = await connectToDatabase();
    const car = await db.collection("cars").findOne({ slug: params.slug });
    const translation = await db
        .collection("cars_translations")
        .find({ itemSlug: params.slug })
        .toArray();

    if (!car) return new Response(null, { status: 404 });

    return new Response(JSON.stringify({ car, translation }), {
        status: 200,
    });
}

export async function PUT({ request, params }) {
    const db = await connectToDatabase();

    // Получаем полный объект яхты с клиента (включая мультиязычные поля)
    const carData = await request.json();

    // Старый и новый slug (идентификаторы яхты)
    const oldSlug = params.slug;
    const newSlug = carData.slug;

    // Формируем массив переводов для коллекции cars_translations,
    // извлекая языковые поля из carData по каждому языку
    const preparedTranslations = ["ru", "en", "tr"].map((lang) => ({
        itemSlug: newSlug, // связываем перевод с новым slug
        lang, // язык перевода
        title: carData.title?.[lang] ?? "",
        description: carData.description?.[lang] ?? "",
        metaDescription: carData.metaDescription?.[lang] ?? "",
        whatYouSee: carData.whatYouSee?.[lang] ?? [],
        tags: carData.tags?.[lang] ?? [],
        meetingPoint: carData.meetingPoint?.[lang] ?? "",
        includes: carData.includes?.[lang] ?? [],
        whatToBring: carData.whatToBring?.[lang] ?? [],
    }));

    // Создаём объект для основной коллекции cars —
    // копируем все поля, кроме мультиязычных
    const car = { ...carData };
    delete car.title;
    delete car.description;
    delete car.metaDescription;
    delete car.whatYouSee;
    delete car.includes;
    delete car.whatToBring;
    delete car.meetingPoint;
    delete car.tags;

    // Обновляем основной документ в коллекции cars по старому slug
    await db.collection("cars").updateOne({ slug: oldSlug }, { $set: car });

    // Удаляем все старые переводы из коллекции cars_translations
    await db.collection("cars_translations").deleteMany({ itemSlug: oldSlug });

    // Вставляем новые переводы
    await db.collection("cars_translations").insertMany(preparedTranslations);

    // Если slug изменился, обновляем его в основном документе
    if (oldSlug !== newSlug) {
        await db
            .collection("cars")
            .updateOne({ slug: oldSlug }, { $set: { slug: newSlug } });
    }

    // Возвращаем успех
    return new Response(JSON.stringify({ success: true }));
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удалим саму экскурсию
    await db.collection("cars").deleteOne({ slug: params.slug });

    // Удалим переводы этой экскурсии
    await db
        .collection("cars_translations")
        .deleteMany({ itemSlug: params.slug });

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
