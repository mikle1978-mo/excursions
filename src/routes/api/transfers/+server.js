import { connectToDatabase } from "$lib/server/mongodb";
import { transferSchema } from "$lib/schemas/transferSchema";
import { json } from "@sveltejs/kit";

export async function GET() {
    const db = await connectToDatabase();
    const transfers = await db.collection("transfers").find({}).toArray();
    return json(transfers);
}

export async function POST({ request }) {
    try {
        const body = await request.json();

        // ✅ Валидация с Zod
        const parsed = transferSchema.safeParse(body);

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
            .collection("transfers")
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
            active: data.active ?? true,
            price: Number(data.price) || 0,
            duration: Number(data.duration) || 0,
            priceType: data.priceType || "per_trip",
            car: {
                model: data.car.model,
                seats: Number(data.car.seats) || 1,
                has_wifi: !!data.car.has_wifi,
                has_child_seats: !!data.car.has_child_seats,
                has_water: !!data.car.has_water,
            },
            images:
                Array.isArray(data.images) && data.images.length > 0
                    ? data.images
                    : [
                          {
                              url: "/images/transfers/transfer_default.webp",
                              public_id: "default",
                          },
                      ],
            rating: 0,
            reviewsCount: 0,
            createdAt: new Date(),
        };

        // 🧾 Вставка яхты
        const result = await db.collection("transfers").insertOne(cleaned);

        // 🈯 Переводы
        const translations = ["ru", "en", "tr"].map((lang) => ({
            itemSlug: cleaned.slug,
            lang,
            title: data.title?.[lang] || "",
            description: data.description?.[lang] || "",
            metaDescription: data.metaDescription?.[lang] || "",
            servicesDetails: data.servicesDetails?.[lang] || {},
        }));

        await db.collection("transfers_translations").insertMany(translations);

        return json({ success: true, slug: cleaned.slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании трансфера:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
