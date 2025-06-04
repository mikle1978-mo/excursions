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
        .find({ tourSlug: slug })
        .sort({ date: -1 })
        .toArray();

    const safeTranslations = translations.map((t) => ({
        ...t,
        _id: t._id.toString(),
    }));

    const safeReviews = reviews.map((review) => ({
        ...review,
        _id: review._id.toString(),
    }));

    const reviewsCount = safeReviews.length;

    const rating =
        reviewsCount > 0
            ? Math.round(
                  (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                      reviewsCount) *
                      10
              ) / 10
            : null;

    return {
        tour: {
            ...tour,
            _id: tour._id.toString(),
            translations: safeTranslations,
        },
        reviewsCount,
        rating,
    };
}
