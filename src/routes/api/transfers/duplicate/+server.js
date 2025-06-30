import { connectToDatabase } from "$lib/server/mongodb";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    try {
        const { slug } = await request.json();

        if (!slug || typeof slug !== "string") {
            return json({ error: "Некорректный slug" }, { status: 400 });
        }

        const db = await connectToDatabase();

        const transfer = await db.collection("transfers").findOne({ slug });
        if (!transfer) {
            return json({ error: "Трансфер не найден" }, { status: 404 });
        }

        const newSlug = `${slug}-copy-${Date.now()}`;
        const newTransfer = {
            ...transfer,
            slug: newSlug,
            createdAt: new Date(),
        };
        delete newTransfer._id;

        await db.collection("transfers").insertOne(newTransfer);

        const translations = await db
            .collection("transfers_translations")
            .find({ itemSlug: slug })
            .toArray();

        const newTranslations = translations.map(({ _id, ...rest }) => ({
            ...rest,
            itemSlug: newSlug,
        }));

        if (newTranslations.length > 0) {
            await db
                .collection("transfers_translations")
                .insertMany(newTranslations);
        }

        return json({ success: true, newSlug }, { status: 201 });
    } catch (err) {
        console.error("Ошибка при дублировании трансфера:", err);
        return json({ error: "Ошибка сервера" }, { status: 500 });
    }
}
