import { json } from "@sveltejs/kit";
import { connectToDatabase } from "$lib/server/mongodb";

export async function GET() {
    const db = await connectToDatabase();
    const collections = await db.listCollections().toArray();
    return json({ collections });
}
