import { connectToDatabase } from "$lib/server/mongodb";
import { carSchema } from "$lib/schemas/carSchema";
import { json } from "@sveltejs/kit";
import { redis } from "$lib/server/redis";

export async function GET() {
    const db = await connectToDatabase();
    const cars = await db.collection("cars").find({}).toArray();
    return new Response(JSON.stringify(cars), { status: 200 });
}

export async function POST({ request }) {
    try {
        const body = await request.json();

        // ✅ Валидация с Zod
        const parsed = carSchema.safeParse(body);

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
        const exists = await db.collection("cars").findOne({ slug: data.slug });
        if (exists) {
            return json(
                { error: "Такой slug уже существует" },
                { status: 409 }
            );
        }

        // ✅ Чистка и дефолты чисел
        const cleaned = {
            slug: data.slug,
            brand: data.brand || "",
            model: data.model || "",
            year: Number(data.year) || new Date().getFullYear(),
            seats: Number(data.seats) || 0,
            doors: Number(data.doors) || 0,
            luggage: Number(data.luggage) || 0,
            fuel: data.fuel || "petrol",
            transmission: data.transmission || "automatic",
            bodyType: data.bodyType || "sedan",
            price: Number(data.price) || 0,
            priceType: data.priceType || "per_day",
            discount: Number(data.discount) || 0,
            distanceLimit: Number(data.distanceLimit) || 250,
            minRentalPeriodValue: Number(data.minRentalPeriodValue) || 1,
            minRentalPeriodUnit: data.minRentalPeriodUnit || "days",
            withDriver: data.withDriver ?? false,
            availableDays:
                Array.isArray(data.availableDays) &&
                data.availableDays.length > 0
                    ? data.availableDays
                    : ["1", "2", "3", "4", "5", "6", "7"],
            images:
                Array.isArray(data.images) && data.images.length > 0
                    ? data.images
                    : ["/images/cars/car_default.webp"],
            active: data.active ?? true,
            rating: 0,
            reviewsCount: 0,
            createdAt: new Date(),
        };

        // 🧾 Вставка машины
        const result = await db.collection("cars").insertOne(cleaned);

        // 🈯 Переводы
        const translations = ["ru", "en", "tr"].map((lang) => ({
            itemSlug: cleaned.slug,
            lang,
            title: data.title?.[lang] || "",
            metaDescription: data.metaDescription?.[lang] || "",
            description: data.description?.[lang] || "",
            fuelPolicy: data.fuelPolicy?.[lang] || "",
            extraTimePolicy: data.extraTimePolicy?.[lang] || "",
            insuranceDescription: data.insuranceDescription?.[lang] || [],
            includes: data.includes?.[lang] || [],
            whatToBring: data.whatToBring?.[lang] || [],
            rentalConditions: data.rentalConditions?.[lang] || [],
            insuranceExclusions: data.insuranceExclusions?.[lang] || [],
            accidentInstructions: data.accidentInstructions?.[lang] || [],
            requiredDocuments: data.requiredDocuments?.[lang] || [],
            notes: data.notes?.[lang] || [],
            tags: data.tags?.[lang] || [],
        }));

        await db.collection("cars_translations").insertMany(translations);
        await redis.del("cars");
        return json({ success: true, slug: cleaned.slug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при создании авто:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
