// src/lib/config/card/card.config.js
import { CardAdapter } from "$lib/features/card/card.adapter.js";

export const card = {
    excursions: {
        adapter: CardAdapter,
        fields: [
            "slug",
            "title",
            "price",
            "discount",
            "discountEnd",
            "images",
            "rating",
            "reviewsCount",
            "active",
        ],
        translationFields: ["title"],
        badgeRules: {
            DISCOUNT: {
                position: "bottomleft",
                condition: ({ discount, discountEnd }) =>
                    discount > 0 &&
                    (!discountEnd || new Date(discountEnd) > new Date()),
                label: {
                    en: "Discount",
                    ru: "Скидка",
                },
                format: ({ discount }) => `-${discount}%`,
            },

            NEW: {
                position: "topleft",
                condition: ({ createdAt }) => {
                    if (!createdAt) return false;
                    const now = Date.now();
                    const created = new Date(createdAt).getTime();
                    return now - created < 30 * 24 * 60 * 60 * 1000;
                },
                label: {
                    en: "New",
                    ru: "Новинка",
                },
            },
            POPULAR: {
                position: "topright",
                condition: ({ rating, reviewsCount }) =>
                    rating >= 4.5 && reviewsCount >= 10,
                label: {
                    en: "Popular",
                    ru: "Популярный",
                },
            },
            VIP: {
                position: "bottomright",
                condition: ({ price }) => price > 900,
                label: {
                    en: "VIP",
                    ru: "VIP",
                },
            },
        },
    },
    yachts: {
        fields: [
            "slug",
            "title",
            "price",
            "discount",
            "discountEnd",
            "images",
            "rating",
            "reviewsCount",
            "active",
        ],
        translationFields: ["title"],
    },
    cars: {
        fields: [
            "slug",
            "title",
            "price",
            "discount",
            "discountEnd",
            "images",
            "rating",
            "reviewsCount",
            "active",
        ],
        translationFields: ["title"],
    },
    transfers: {
        fields: [
            "slug",
            "title",
            "price",
            "discount",
            "discountEnd",
            "images",
            "rating",
            "reviewsCount",
            "active",
        ],
        translationFields: ["title"],
    },
    places: {
        fields: ["slug", "title", "metaDescription", "images", "active"],
        translationFields: ["title", "metaDescription"],
    },
    blogs: {
        fields: [
            "slug",
            "title",
            "metaDescription",
            "publishDate",
            "author",
            "images",
            "active",
            "publishDate",
        ],
        translationFields: ["title", "metaDescription", "author"],
    },
    faqs: {
        fields: ["slug", "title", "metaDescription", "images", "active"],
        translationFields: ["title"],
    },
};
