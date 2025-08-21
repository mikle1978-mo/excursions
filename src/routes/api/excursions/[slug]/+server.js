import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";
import { excursionSteps } from "$lib/components/admin/fields/excursions";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// вспомогательные функции
function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name) {
    return excursionSteps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

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
    const excursionData = await request.json();

    const oldSlug = params.slug;
    const newSlug = excursionData.slug;

    // Все поля
    const allFields = flattenFields(excursionSteps);

    // Локализованные поля
    const localizedFields = allFields.filter((f) => isLocalizedField(f.name));

    // Подготовка переводов для каждой локали
    const preparedTranslations = SUPPORTED_LANGUAGES.map((lang) => {
        const t = { itemSlug: newSlug, lang };
        for (const field of localizedFields) {
            t[field.name] =
                excursionData[field.name]?.[lang] ??
                field.default?.[lang] ??
                (Array.isArray(field.default) ? [] : "");
        }
        return t;
    });

    // Основной документ — все не-локализованные поля
    const mainDoc = { ...excursionData };
    for (const field of localizedFields) {
        delete mainDoc[field.name]; // удаляем локализованные поля
    }

    // Обновляем основной документ и slug одной операцией
    await db
        .collection("excursions")
        .updateOne({ slug: oldSlug }, { $set: { ...mainDoc, slug: newSlug } });

    // Обновляем переводы: удаляем старые и вставляем новые
    await db
        .collection("excursions_translations")
        .deleteMany({ itemSlug: oldSlug });
    await db
        .collection("excursions_translations")
        .insertMany(preparedTranslations);

    // Чистим кеш Redis
    await redis.del("excursions");

    return new Response(JSON.stringify({ success: true, slug: newSlug }));
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удалим саму экскурсию
    await db.collection("excursions").deleteOne({ slug: params.slug });

    // Удалим переводы этой экскурсии
    await db
        .collection("excursions_translations")
        .deleteMany({ itemSlug: params.slug });

    await redis.del("excursions");

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
