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
        listText: excursions_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
        },
    },
    yachts: {
        listText: yachts_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
        },
    },
    cars: {
        listText: cars_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
        },
    },
    transfers: {
        listText: transfers_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: {
            default: null, // random selection
        },
    },
    places: {
        listText: places_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: { createdAt: -1 },
    },
    blogs: {
        listText: blogs_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: { publishDate: -1 },
    },
    faqs: {
        listText: blogs_LIST_TEXT,
        schemas: [],
        filters: {},
        sortOptions: { createdAt: -1 },
    },
};
