import { connectToDatabase } from "$lib/server/mongodb";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
    const db = await connectToDatabase();

    const transfer = await db
        .collection("transfers")
        .findOne({ slug: params.slug });
    if (!transfer)
        return json({ error: "Трансфер не найден" }, { status: 404 });

    const translation = await db
        .collection("transfers_translations")
        .find({ itemSlug: params.slug })
        .toArray();

    return json({ transfer, translation });
}

export async function PUT({ request, params }) {
    const db = await connectToDatabase();

    const transferData = await request.json();

    const oldSlug = params.slug;
    const newSlug = transferData.slug.trim().toLowerCase();

    // Формируем массив переводов для коллекции transfers_translations,
    // извлекая языковые поля из transferData по каждому языку
    const preparedTranslations = ["ru", "en", "tr"].map((lang) => ({
        itemSlug: newSlug,
        lang,
        title: transferData.title?.[lang] ?? "",
        description: transferData.description?.[lang] ?? "",
        metaDescription: transferData.metaDescription?.[lang] ?? "",
        servicesDetails: transferData.servicesDetails?.[lang] ?? [],
    }));

    // Создаём объект для основной коллекции transfers —
    // копируем все поля, кроме мультиязычных
    const transfer = { ...transferData };
    delete transfer.title;
    delete transfer.description;
    delete transfer.metaDescription;
    delete transfer.servicesDetails;

    // Обновляем основной документ в коллекции transfers по старому slug
    await db
        .collection("transfers")
        .updateOne({ slug: oldSlug }, { $set: transfer });

    // Удаляем все старые переводы из коллекции transfers_translations
    await db
        .collection("transfers_translations")
        .deleteMany({ itemSlug: oldSlug });

    // Вставляем новые переводы
    await db
        .collection("transfers_translations")
        .insertMany(preparedTranslations);

    // Если slug изменился, обновляем его в основном документе
    if (oldSlug !== newSlug) {
        await db
            .collection("transfers")
            .updateOne({ slug: oldSlug }, { $set: { slug: newSlug } });
    }

    return json({ success: true });
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удаляем сам трансфер
    await db.collection("transfers").deleteOne({ slug: params.slug });

    // Удаляем переводы трансфера
    await db
        .collection("transfers_translations")
        .deleteMany({ itemSlug: params.slug });

    return json({ success: true });
}
