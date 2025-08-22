import { connectToDatabase } from "$lib/server/mongodb";
import { redis } from "$lib/server/redis";
import { carSteps } from "$lib/components/admin/fields/cars";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// Вспомогательные функции
function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

function isLocalizedField(name) {
    return carSteps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

// ------------------- GET -------------------
export async function GET({ params }) {
    const db = await connectToDatabase();
    const car = await db.collection("cars").findOne({ slug: params.slug });
    const translation = await db
        .collection("cars_translations")
        .find({ itemSlug: params.slug })
        .toArray();

    if (!car) return new Response(null, { status: 404 });

    return new Response(JSON.stringify({ car, translation }), { status: 200 });
}

// ------------------- PUT -------------------
export async function PUT({ request, params }) {
    const db = await connectToDatabase();
    const carData = await request.json();

    const oldSlug = params.slug;
    const newSlug = carData.slug;

    const allFields = flattenFields(carSteps);
    const localizedFields = allFields.filter((f) => isLocalizedField(f.name));

    // Подготовка переводов для каждой локали
    const preparedTranslations = SUPPORTED_LANGUAGES.map((lang) => {
        const t = { itemSlug: newSlug, lang };
        for (const field of localizedFields) {
            t[field.name] =
                carData[field.name]?.[lang] ??
                field.default?.[lang] ??
                (Array.isArray(field.default) ? [] : "");
        }
        return t;
    });

    // Основной документ — все не-локализованные поля
    const mainDoc = { ...carData };
    for (const field of localizedFields) {
        delete mainDoc[field.name];
    }

    // Обновляем основной документ и slug одной операцией
    await db
        .collection("cars")
        .updateOne({ slug: oldSlug }, { $set: { ...mainDoc, slug: newSlug } });

    // Обновляем переводы: удаляем старые и вставляем новые
    await db.collection("cars_translations").deleteMany({ itemSlug: oldSlug });
    await db.collection("cars_translations").insertMany(preparedTranslations);

    // Чистим кеш Redis
    await redis.del("cars");

    return new Response(JSON.stringify({ success: true, slug: newSlug }));
}

// ------------------- DELETE -------------------
export async function DELETE({ params }) {
    const db = await connectToDatabase();

    // Удалим машину
    await db.collection("cars").deleteOne({ slug: params.slug });

    // Удалим переводы этой машины
    await db
        .collection("cars_translations")
        .deleteMany({ itemSlug: params.slug });

    await redis.del("cars");

    return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}
