import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";
import { yachtSteps } from "$lib/components/admin/fields/yachts";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// вспомогательные функции
function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name) {
    return yachtSteps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

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
    const yachtData = await request.json();

    const oldSlug = params.slug;
    const newSlug = yachtData.slug;

    // Все поля
    const allFields = flattenFields(yachtSteps);

    // Локализованные поля
    const localizedFields = allFields.filter((f) => isLocalizedField(f.name));

    // Подготовка переводов для каждой локали
    const preparedTranslations = SUPPORTED_LANGUAGES.map((lang) => {
        const t = { itemSlug: newSlug, lang };
        for (const field of localizedFields) {
            const value =
                yachtData[field.name] ??
                field.default ??
                (field.type === "array" ? [] : "");
            t[field.name] = value[lang] ?? (field.type === "array" ? [] : "");
        }
        return t;
    });

    // Основной документ — все не-локализованные поля
    const mainDoc = { ...yachtData };
    for (const field of localizedFields) {
        delete mainDoc[field.name];
    }

    // Обновляем основной документ и slug одной операцией
    await db
        .collection("yachts")
        .updateOne({ slug: oldSlug }, { $set: { ...mainDoc, slug: newSlug } });

    // Обновляем переводы: удаляем старые и вставляем новые
    await db
        .collection("yachts_translations")
        .deleteMany({ itemSlug: oldSlug });
    await db.collection("yachts_translations").insertMany(preparedTranslations);

    // Чистим кеш Redis
    await redis.del("yachts");

    return new Response(JSON.stringify({ success: true, slug: newSlug }));
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удаляем саму яхту
    await db.collection("yachts").deleteOne({ slug: params.slug });

    // Удаляем переводы
    await db
        .collection("yachts_translations")
        .deleteMany({ itemSlug: params.slug });

    await redis.del("yachts");

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
