import { connectToDatabase } from "$lib/server/mongodb";

export async function GET() {
    const db = await connectToDatabase();
    const collection = db.collection("tours");

    const tours = await collection.find({}).toArray();

    return new Response(JSON.stringify(tours), {
        headers: { "Content-Type": "application/json" },
    });
}
