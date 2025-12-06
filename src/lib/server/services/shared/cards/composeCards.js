// src/lib/server/services/shared/cards/composeCards.js

import { appConfig } from "$lib/config/app.config.js";
import { enrichCard } from "$lib/helpers/enrichCard.js";

export async function composeCards({ db, type, lang = "en" }) {
    const collectionCfg = appConfig.collections[type];
    if (!collectionCfg) throw new Error(`Unknown collection type: ${type}`);

    const cardCfg = collectionCfg.cardConfig;
    if (!cardCfg?.fields)
        throw new Error(`Missing cardConfig.fields for ${type}`);

    const listCfg = appConfig.list[type] ?? {};

    // ===== PROJECTION =====
    const projection = Object.fromEntries(cardCfg.fields.map((f) => [f, 1]));

    // ===== MATCH =====
    const match = { active: true };

    // ===== SORT / SAMPLE / LIMIT =====
    const sort = listCfg.sortOptions?.default ?? null;
    const limit = listCfg.limit ?? 100;
    const sample = listCfg.sample ?? null;

    const pipeline = [{ $match: match }];
    if (sort) pipeline.push({ $sort: sort });
    if (sample) pipeline.push({ $sample: { size: sample } });
    pipeline.push({ $limit: limit });
    pipeline.push({ $project: projection });

    // ===== EXECUTE =====
    let items = await db.collection(type).aggregate(pipeline).toArray();

    // ===== TRANSLATIONS =====
    const slugs = items.map((i) => i.slug);
    const translations = await db
        .collection(`${type}_translations`)
        .find({ itemSlug: { $in: slugs }, lang })
        .toArray();

    // ===== REVIEWS =====
    const reviewCollection = "reviews"; // или из конфига, если нужно
    const reviewStats = await db
        .collection(reviewCollection)
        .aggregate([
            { $match: { itemSlug: { $in: slugs } } },
            {
                $group: {
                    _id: "$itemSlug",
                    reviewsCount: { $sum: 1 },
                    rating: { $avg: "$rating" },
                },
            },
        ])
        .toArray();
    const reviewMap = Object.fromEntries(
        reviewStats.map((r) => [
            r._id,
            {
                reviewsCount: r.reviewsCount,
                rating: Math.round(r.rating * 10) / 10,
            },
        ])
    );

    // ===== APPLY TRANSLATIONS, IMAGE, REVIEWS =====
    items = items.map((item) => {
        const tr = translations.find((t) => t.itemSlug === item.slug) ?? {};

        // Перевод только нужных полей
        (cardCfg.translationFields || []).forEach((f) => {
            if (tr[f] !== undefined) item[f] = tr[f];
        });

        // Первая картинка

        if (item.images?.length) item.image = item.images[0].url;

        // reviewsCount и rating — только если есть в конфиге
        if (
            cardCfg.fields.includes("reviewsCount") &&
            cardCfg.fields.includes("rating")
        ) {
            if (reviewMap[item.slug]) {
                item.reviewsCount = reviewMap[item.slug].reviewsCount;
                item.rating = reviewMap[item.slug].rating;
            } else {
                item.reviewsCount = 0;
                item.rating = 0;
            }
        }

        // Убираем массив images, чтобы не тянуть лишние данные
        delete item.images;

        return item;
    });

    // ===== ENRICH =====
    return enrichCard(items, lang);
}
