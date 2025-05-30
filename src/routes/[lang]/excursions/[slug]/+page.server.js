import { connectToDatabase } from "$lib/server/mongodb";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { lang, slug } = params;

    const db = await connectToDatabase();
    const toursCollection = db.collection("excursions");
    const translationsCollection = db.collection("excursions_translations");
    const reviewsCollection = db.collection("reviews");

    const tour = await toursCollection.findOne({ slug });

    if (!tour) throw error(404, "Экскурсия не найдена");

    const translations = await translationsCollection
        .find({ tourSlug: slug })
        .toArray();

    const reviews = await reviewsCollection
        .find({ tourId: tour._id })
        .sort({ date: -1 })
        .toArray();

    const safeTranslations = translations.map((t) => ({
        ...t,
        _id: t._id.toString(),
    }));

    return {
        tour: {
            ...tour,
            _id: tour._id.toString(),
            translations: safeTranslations,
        },
        reviews,
    };
}
