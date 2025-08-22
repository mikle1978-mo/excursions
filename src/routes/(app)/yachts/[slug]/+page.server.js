import { connectToDatabase } from "$lib/server/mongodb";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { lang, slug } = params;

    const db = await connectToDatabase();
    const yachtsCollection = db.collection("yachts");
    const translationsCollection = db.collection("yachts_translations");
    const reviewsCollection = db.collection("reviews");

    const yacht = await yachtsCollection.findOne({ slug });

    if (!yacht) throw error(404, "Яхта не найдена");

    const translations = await translationsCollection
        .find({ itemSlug: slug })
        .toArray();

    const reviews = await reviewsCollection
        .find({ itemSlug: slug })
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
        yacht: {
            ...yacht,
            _id: yacht._id.toString(),
            translations: safeTranslations,
        },
        reviewsCount,
        rating,
    };
}
