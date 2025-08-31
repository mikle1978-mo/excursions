// $lib/constants/servicesConfig.js
import {
    excursions_SEO_TEXT,
    places_SEO_TEXT,
    yachts_SEO_TEXT,
    cars_SEO_TEXT,
    transfers_SEO_TEXT,
} from "$lib/i18n/SEO_TEXTS.js";

export const pageListConfig = {
    excursions: {
        seoText: excursions_SEO_TEXT,
        defaultImage: "excursion_default.webp",
    },
    yachts: {
        seoText: yachts_SEO_TEXT,
        defaultImage: "yacht_default.webp",
    },
    cars: {
        seoText: cars_SEO_TEXT,
        defaultImage: "car_default.webp",
    },
    transfers: {
        seoText: transfers_SEO_TEXT,
        defaultImage: "transfer_default.webp",
    },
    places: {
        seoText: places_SEO_TEXT,
        defaultImage: "place_default.webp",
    },
};
