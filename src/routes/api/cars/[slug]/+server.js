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

    const carData = await request.json();
    const oldSlug = params.slug;
    const newSlug = carData.slug;

    // Подготовка переводов
    const preparedTranslations = ["ru", "en", "tr"].map((lang) => ({
        itemSlug: newSlug,
        lang,
        title: carData.title?.[lang] ?? "",
        description: carData.description?.[lang] ?? "",
        metaDescription: carData.metaDescription?.[lang] ?? "",
        fuelPolicy: carData.fuelPolicy?.[lang] ?? "",
        extraTimePolicy: carData.extraTimePolicy?.[lang] ?? "",
        insuranceDescription: carData.insuranceDescription?.[lang] ?? [],
        rentalConditions: carData.rentalConditions?.[lang] ?? [],
        accidentInstructions: carData.accidentInstructions?.[lang] ?? [],
        includes: carData.includes?.[lang] ?? [],
        whatToBring: carData.whatToBring?.[lang] ?? [],
        insuranceExclusions: carData.insuranceExclusions?.[lang] ?? [],
        requiredDocuments: carData.requiredDocuments?.[lang] ?? [],
        notes: carData.notes?.[lang] ?? [],
        tags: carData.tags?.[lang] ?? [],
    }));

    // Формируем основной объект без мультиязычных полей
    const car = { ...carData };
    delete car.title;
    delete car.description;
    delete car.metaDescription;
    delete car.fuelPolicy;
    delete car.extraTimePolicy;
    delete car.insuranceDescription;
    delete car.rentalConditions;
    delete car.accidentInstructions;
    delete car.includes;
    delete car.whatToBring;
    delete car.insuranceExclusions;
    delete car.requiredDocuments;
    delete car.notes;
    delete car.tags;

    // Обновляем основной документ
    await db.collection("cars").updateOne({ slug: oldSlug }, { $set: car });

    // Удаляем старые переводы
    await db.collection("cars_translations").deleteMany({ itemSlug: oldSlug });

    // Вставляем новые переводы
    await db.collection("cars_translations").insertMany(preparedTranslations);

    // Если slug изменился, обновляем его
    if (oldSlug !== newSlug) {
        await db
            .collection("cars")
            .updateOne({ slug: oldSlug }, { $set: { slug: newSlug } });
    }

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
