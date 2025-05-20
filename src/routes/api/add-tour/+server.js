import { json } from "@sveltejs/kit";
import { connectToDatabase } from "$lib/server/mongodb";

export async function POST({ request }) {
    const data = await request.json();

    if (!data.name || !data.price) {
        return json({ error: "Недостаточно данных" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const collection = db.collection("tours");

    const result = await collection.insertOne({
        name: data.name,
        price: Number(data.price),
    });

    return json({ insertedId: result.insertedId });
}
