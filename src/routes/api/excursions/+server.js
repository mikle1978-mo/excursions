import { connectToDatabase } from "$lib/server/mongodb";

export async function GET() {
    const db = await connectToDatabase();
    const excursions = await db.collection("excursions").find({}).toArray();
    return new Response(JSON.stringify(excursions), { status: 200 });
}

export async function POST({ request }) {
    const data = await request.json();
    const db = await connectToDatabase();

    await db.collection("excursions").insertOne(data);
    return new Response(JSON.stringify({ success: true }), { status: 201 });
}
