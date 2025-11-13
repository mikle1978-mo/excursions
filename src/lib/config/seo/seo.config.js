// $lib/constants/pageDetailsConfig.js

import {
    excursions_page,
    cars_page,
    yachts_page,
    transfers_page,
    blogs_page,
    places_page,
} from "$lib/i18n/product_details_page";

export const seo = {
    excursions: {
        translations: excursions_page,
        defaultImage: "excursion_default.webp",
    },
    yachts: {
        translations: yachts_page,
        defaultImage: "yacht_default.webp",
    },
    cars: {
        translations: cars_page,
        defaultImage: "car_default.webp",
    },
    transfers: {
        translations: transfers_page,
        defaultImage: "transfer_default.webp",
    },
    places: {
        translations: places_page,
        defaultImage: "place_default.webp",
    },
    blogs: {
        translations: blogs_page,
        defaultImage: "blog_default.webp",
    },
    faqs: {
        translations: blogs_page,
        defaultImage: "blog_default.webp",
    },
};
