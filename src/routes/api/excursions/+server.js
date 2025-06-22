import { connectToDatabase } from "$lib/server/mongodb";
import { excursionSchema } from "$lib/schemas/excursionSchema";
import { json } from "@sveltejs/kit";

export async function GET() {
    const db = await connectToDatabase();
    const excursions = await db.collection("excursions").find({}).toArray();
    return new Response(JSON.stringify(excursions), { status: 200 });
}

export async function POST({ request }) {
    try {
        const body = await request.json();

        // ✅ Валидация с Zod
        const parsed = excursionSchema.safeParse(body);

        if (!parsed.success) {
            return json(
                { error: "Ошибка валидации", issues: parsed.error.format() },
                { status: 400 }
            );
        }

        const data = parsed.data;
        // ✅ Нормализация slug
        data.slug = data.slug.trim().toLowerCase();

        const db = await connectToDatabase();

        // ✅ Проверка уникальности slug
        const exists = await db
            .collection("excursions")
            .findOne({ slug: data.slug });
        if (exists) {
            return json(
                { error: "Такой slug уже существует" },
                { status: 409 }
            );
        }

        // ✅ Чистка и дефолты чисел
        const cleaned = {
            slug: data.slug,
            start: data.start || "08:00",
            duration: Number(data.duration) || 0,
            distance: Number(data.distance) || 0,
            groupSize: Number(data.groupSize) || 1,
            price: Number(data.price) || 0,
            discount: Number(data.discount) || 0,
            days:
                Array.isArray(data.days) && data.days.length > 0
                    ? data.days
                    : ["1", "2", "3", "4", "5", "6", "7"],
            images:
                Array.isArray(data.images) && data.images.length > 0
                    ? data.images
                    : ["/images/excursions/excursion_default.webp"],
            rating: 0,
            reviewsCount: 0,
            createdAt: new Date(),
        };

        // 🧾 Вставка яхты
        const result = await db.collection("excursions").insertOne(cleaned);

        // 🈯 Переводы
        const translations = ["ru", "en", "tr"].map((lang) => ({
            itemSlug: cleaned.slug,
            lang,
            title: data.title?.[lang] || "",
            metaDescription: data.metaDescription?.[lang] || "",
            description: data.description?.[lang] || "",
            meetingPoint: data.meetingPoint?.[lang] || "",
            whatYouSee: data.whatYouSee?.[lang] || [],
            includes: data.includes?.[lang] || [],
            whatToBring: data.whatToBring?.[lang] || [],
            tags: data.tags?.[lang] || [],
        }));

        await db.collection("excursions_translations").insertMany(translations);

        return json({ success: true, slug: cleaned.slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании экскурсии:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
