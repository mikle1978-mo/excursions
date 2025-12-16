import { icons } from "$lib/icons/icons.js";
import { PriceBlockAdapter } from "$lib/features/priceBlock/priceBlock.adapter.js";
import { GalleryBlockAdapter } from "$lib/features/galleryBlock/galleryBlock.adapter.js";

export const detail = {
    // ===== ABOUT =====
    about: {
        sections: [
            {
                component: "HeroBlock",
                fields: { h1: "h1", images: "images" },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            {
                component: "Description",
                fields: { description: "description" },
            },
            {
                component: "TextBlock",
                fields: {
                    title: { ru: "О нас", en: "About us" },
                    text: "intro",
                    icon: icons.lifeBuoy,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    title: null,
                    text: "paragraph1",
                    icon: null,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    title: null,
                    text: "paragraph2",
                    icon: null,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    title: null,
                    text: "highlighted",
                    icon: null,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    title: null,
                    text: "quote",
                    icon: null,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    items: "reasons",
                    icon: icons.thumbsUp,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    title: { ru: "Наши партнеры", en: "Our partners" },
                    items: "partners",
                    icon: icons.briefCase,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    title: { ru: "Лицензия № 3834", en: "Licensed No. 3834" },
                    text: "licenseText",
                    icon: icons.clipBoard,
                },
            },
        ],
    },
    // ===== EXCURSIONS =====
    excursions: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
                style: {
                    variant: "accent",
                    tone: "light",
                    align: "left",
                },
            },

            {
                component: "PriceBlock",
                adapter: PriceBlockAdapter,
                style: {
                    variant: "normal",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "HtmlBlock",
                fields: { html: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },
            {
                component: "YouTubeBlock",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GalleryBlock",
                adapter: GalleryBlockAdapter,
                style: {
                    variant: "normal",
                },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
            {
                component: "ReviewsBlock",
                fields: { slug: "slug", reviews: "reviews" },
            },
            { component: "RelatedBlok", fields: ["related"] },
        ],
    },

    // ===== YACHTS =====
    yachts: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
            },
            {
                component: "PriceBlock",
                fields: {
                    price: "price",
                    discount: "discount",
                    priceType: "priceType",
                    discountEnd: "discountEnd",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "Description",
                fields: { html: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },

            {
                component: "YouTubeVideo",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },

            {
                component: "ReviewsList",
                fields: { slug: "slug", reviews: "reviews" },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
        ],
    },

    // ===== CARS =====
    cars: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
            },
            {
                component: "PriceBlock",
                fields: {
                    price: "price",
                    discount: "discount",
                    priceType: "priceType",
                    discountEnd: "discountEnd",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "Description",
                fields: { description: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },

            {
                component: "YouTubeVideo",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },

            {
                component: "ReviewsList",
                fields: { slug: "slug", reviews: "reviews" },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
            { component: "RelatedSlider", fields: ["related"] },
        ],
    },

    // ===== TRANSFERS =====
    transfers: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
            },
            {
                component: "PriceBlock",
                fields: {
                    price: "price",
                    discount: "discount",
                    priceType: "priceType",
                    discountEnd: "discountEnd",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "Description",
                fields: { description: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },

            {
                component: "YouTubeVideo",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },

            {
                component: "ReviewsList",
                fields: { slug: "slug", reviews: "reviews" },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
            { component: "RelatedSlider", fields: ["related"] },
        ],
    },

    // ===== PLACES (туристические места) =====
    places: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
            },
            {
                component: "PriceBlock",
                fields: {
                    price: "price",
                    discount: "discount",
                    priceType: "priceType",
                    discountEnd: "discountEnd",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "Description",
                fields: { description: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },

            {
                component: "YouTubeVideo",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },

            {
                component: "ReviewsList",
                fields: { slug: "slug", reviews: "reviews" },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
            { component: "RelatedSlider", fields: ["related"] },
        ],
    },

    // ===== BLOGS =====
    blogs: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
            },
            {
                component: "PriceBlock",
                fields: {
                    price: "price",
                    discount: "discount",
                    priceType: "priceType",
                    discountEnd: "discountEnd",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "Description",
                fields: { description: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },

            {
                component: "YouTubeVideo",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },

            {
                component: "ReviewsList",
                fields: { slug: "slug", reviews: "reviews" },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
            { component: "RelatedSlider", fields: ["related"] },
        ],
    },

    // ===== FAQ =====
    faqs: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
            },
            {
                component: "PriceBlock",
                fields: {
                    price: "price",
                    discount: "discount",
                    priceType: "priceType",
                    discountEnd: "discountEnd",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "Description",
                fields: { description: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },

            {
                component: "YouTubeVideo",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },

            {
                component: "ReviewsList",
                fields: { slug: "slug", reviews: "reviews" },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
            { component: "RelatedSlider", fields: ["related"] },
        ],
    },

    // ===== properties (аренда недвижимости) =====
    properties: {
        sections: [
            {
                component: "HeroBlock",
                fields: {
                    title: "title",
                    images: "images",
                    subtitle: "subtitle",
                    rating: "rating",
                    reviewCount: "reviewsCount",
                },
            },
            {
                component: "PriceBlock",
                fields: {
                    price: "price",
                    discount: "discount",
                    priceType: "priceType",
                    discountEnd: "discountEnd",
                },
            },
            {
                component: "ProductDetailsBlock",
                fields: {
                    distance: "distance",
                    duration: "duration",
                    groupSize: "groupSize",
                    stat: "start",
                },
            },
            {
                component: "Description",
                fields: { description: "description" },
            },
            { component: "ScheduleBlock", fields: { schedule: "schedule" } },
            {
                component: "ListBlock",
                fields: {
                    items: "whatYouSee",
                    title: { ru: "Что вы увидите", en: "What you see" },
                    icon: icons.image,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "whatToBring",
                    title: { ru: "Что взять с собой", en: "What to bring" },
                    icon: icons.briefCase,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "includes",
                    title: { ru: "Что включено", en: "What is included" },
                    icon: icons.gift,
                },
            },
            {
                component: "TextBlock",
                fields: {
                    text: "meetingPoint",
                    title: { ru: "Место встречи", en: "Meeting point" },
                    icon: icons.mapPin,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "usp",
                    title: { ru: "Наши преимущества", en: "Adventeges" },
                    icon: icons.plus,
                },
            },
            {
                component: "ListBlock",
                fields: {
                    items: "guarantees",
                    title: { ru: "Гарантии", en: "Guarantees" },
                    icon: icons.clipBoard,
                },
            },

            {
                component: "YouTubeVideo",
                fields: {
                    videoUrl: "videoUrl",
                    title: "title",
                    images: "images",
                },
            },
            {
                component: "GaleryCollage",
                fields: { title: "title", images: "images" },
            },
            { component: "AboutBlock", fields: {} },
            {
                component: "ListBlock",
                fields: {
                    items: "whyChooseUs",
                    title: { ru: "Почему выбирают нас", en: "Why choose us" },
                    icon: icons.thumbsUp,
                },
            },

            {
                component: "ReviewsList",
                fields: { slug: "slug", reviews: "reviews" },
            },
            {
                component: "ButtonBlock",
                fields: {
                    active: "active",
                    type: "type",
                    label: { ru: "Заказать", en: "Order" },
                },
            },
            { component: "RelatedSlider", fields: { related: "related" } },
        ],
    },
};
