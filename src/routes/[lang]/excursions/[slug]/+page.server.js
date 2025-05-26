import { connectToDatabase } from "$lib/server/mongodb";
import { ObjectId } from "mongodb";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const db = await connectToDatabase();
    const toursCollection = db.collection("tours");
    const reviewsCollection = db.collection("reviews");

    const tour = await toursCollection.findOne({ slug: params.slug });

    if (!tour) {
        throw error(404, "Экскурсия не найдена");
    }

    const reviews = await reviewsCollection
        .find({ tourId: tour._id })
        .sort({ date: -1 })
        .toArray();

    return {
        tour: {
            ...tour,
            _id: tour._id.toString(),
        },
        reviews,
    };
}
