// src/lib/config/card/card.config.js

export const card = {
    excursions: {
        fields: [
            "slug",
            "title",
            "price",
            "discount",
            "images",
            "rating",
            "reviewsCount",
            "active",
        ],
        translationFields: ["title"],
    },
    yachts: {
        fields: [
            "slug",
            "title",
            "price",
            "discount",
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
