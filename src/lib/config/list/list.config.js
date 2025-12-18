// src\lib\config\list\list.config.js
import {
    excursions_LIST_TEXT,
    places_LIST_TEXT,
    yachts_LIST_TEXT,
    cars_LIST_TEXT,
    transfers_LIST_TEXT,
    blogs_LIST_TEXT,
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
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: excursions_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
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
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: yachts_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
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
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: cars_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
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
                "rating",
                "reviewsCount",
                "active",
            ],
            translationFields: ["title"],
            withReviews: true,
        },
        listText: transfers_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
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
        filters: {},
        sortOptions: { createdAt: -1 },
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

        sortOptions: { publishDate: -1 },
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
        listText: blogs_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: { createdAt: -1 },
    },
};
