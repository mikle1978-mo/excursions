import { connectToDatabase } from "$lib/server/mongodb";

export async function GET({ params }) {
    const db = await connectToDatabase();
    const excursion = await db
        .collection("excursions")
        .findOne({ slug: params.slug });

    if (!excursion) {
        return new Response(JSON.stringify({ error: "Не найдено" }), {
            status: 404,
        });
    }

    return new Response(JSON.stringify(excursion), { status: 200 });
}

export async function PUT({ params, request }) {
    const db = await connectToDatabase();
    const data = await request.json();

    await db
        .collection("excursions")
        .updateOne({ slug: params.slug }, { $set: data });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE({ params }) {
    const db = await connectToDatabase();

    await db.collection("excursions").deleteOne({ slug: params.slug });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
