import { connectToDatabase } from "$lib/server/mongodb";
import { excursions } from "$lib/data/excursions";
export async function POST() {
    const db = await connectToDatabase();
    const collection = db.collection("tours");

    const result = await collection.insertMany(excursions);

    return new Response(
        JSON.stringify({ insertedCount: result.insertedCount }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
}
