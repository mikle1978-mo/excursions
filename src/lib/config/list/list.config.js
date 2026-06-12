// src\lib\config\list\list.config.js
import {
    excursions_LIST_TEXT,
    places_LIST_TEXT,
    yachts_LIST_TEXT,
    cars_LIST_TEXT,
    transfers_LIST_TEXT,
    blogs_LIST_TEXT,
    faqs_LIST_TEXT,
} from "$lib/i18n/LIST_TEXTS.js";

export const list = {
    excursions: {
        query: {
            fields: [
                "slug",
                "price",
                "discount",
                "discountEnd",
                "images",
                "duration",
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: excursions_LIST_TEXT,
        schemas: [],
        toolbar: {
            search: true,
            sort: ["price", "rating", "duration"],
            defaultSort: { field: "rating", dir: "desc" },
            showFiltersButton: true,
            searchFields: ["title"],
        },
        filters: {
            price: {
                field: "price",
                type: "range",
                enabled: true,
            },

            duration: {
                field: "duration",
                type: "range",
                enabled: true,
            },

            rating: {
                field: "rating",
                type: "min",
                enabled: true,
            },
        },
    },
    yachts: {
        query: {
            fields: [
                "slug",
                "price",
                "discount",
                "discountEnd",
                "images",
                "duration",
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: yachts_LIST_TEXT,
        schemas: [],
        toolbar: {
            search: true,
            sort: ["price", "rating", "duration"],
            defaultSort: { field: "rating", dir: "desc" },
            showFiltersButton: true,
            searchFields: ["title"],
        },

        filters: {
            price: {
                field: "price",
                type: "range",
                enabled: true,
            },

            duration: {
                field: "duration",
                type: "range",
                enabled: true,
            },

            rating: {
                field: "rating",
                type: "min",
                enabled: true,
            },
        },
    },
    cars: {
        query: {
            fields: [
                "slug",
                "price",
                "discount",
                "discountEnd",
                "images",
                "duration",
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: cars_LIST_TEXT,
        schemas: [],
        toolbar: {
            search: true,
            sort: ["price", "rating", "duration"],
            defaultSort: { field: "rating", dir: "desc" },
            showFiltersButton: true,
            searchFields: ["title"],
        },

        filters: {
            price: {
                field: "price",
                type: "range",
                enabled: true,
            },

            duration: {
                field: "duration",
                type: "range",
                enabled: true,
            },

            rating: {
                field: "rating",
                type: "min",
                enabled: true,
            },
        },
    },
    transfers: {
        query: {
            fields: [
                "slug",
                "price",
                "discount",
                "discountEnd",
                "images",
                "duration",
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: transfers_LIST_TEXT,
        schemas: [],
        toolbar: {
            search: true,
            sort: ["price", "rating", "duration"],
            defaultSort: { field: "rating", dir: "desc" },
            showFiltersButton: true,
            searchFields: ["title"],
        },

        filters: {
            price: {
                field: "price",
                type: "range",
                enabled: true,
            },
            duration: {
                field: "duration",
                type: "range",
                enabled: true,
            },
            rating: {
                field: "rating",
                type: "min",
                enabled: true,
            },
        },
    },
    places: {
        query: {
            fields: ["slug", "title", "subtitle", "images", "active"],
            translationFields: ["title", "subtitle"],
            withReviews: true,
        },
        listText: places_LIST_TEXT,
        schemas: [],
        toolbar: {
            search: true,
            sort: ["publishDate"],
            defaultSort: { field: "publishDate", dir: "desc" },
            showFiltersButton: false,
            searchFields: ["title", "subtitle"],
        },
        filters: {
            price: {},
            duration: {},
            rating: {},
        },
    },
    blogs: {
        query: {
            fields: [
                "slug",
                "title",
                "subtitle",
                "author",
                "publishDate",
                "images",
                "active",
            ],
            translationFields: ["title", "subtitle", "author"],
            withReviews: true,
        },
        listText: blogs_LIST_TEXT,
        schemas: [],
        toolbar: {
            search: true,
            sort: ["publishDate"],
            defaultSort: { field: "publishDate", dir: "desc" },
            showFiltersButton: false,
            searchFields: ["title", "author"],
        },
        filters: {
            price: {},
            duration: {},
            rating: {},
        },
    },
    faqs: {
        query: {
            fields: [
                "slug",
                "price",
                "discount",
                "discountEnd",
                "images",
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: faqs_LIST_TEXT,
        schemas: [],
        toolbar: {
            search: true,
            sort: [],
            defaultSort: {},
            showFiltersButton: false,
            searchFields: ["title", "description"],
        },
        filters: {
            price: {},
            duration: {},
            rating: {},
        },
    },
};
