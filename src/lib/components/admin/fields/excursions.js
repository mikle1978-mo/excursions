import { createLocalizedDefault } from "$lib/utils/createLocalizedDefault";

export const excursionSteps = [
    {
        title: "Общие данные",
        fields: [
            {
                name: "active",
                label: "Активна",
                type: "checkbox",
                default: true,
            },
            { name: "slug", label: "Slug", type: "text", required: true },

            {
                name: "h1",
                label: "Заголовок H1",
                type: "text",
                localized: true,
                required: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "subtitle",
                label: "Подзаголовок",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
            },

            {
                name: "duration",
                label: "Длительность (часы)",
                type: "number",
                default: 0,
            },
            {
                name: "groupSize",
                label: "Размер группы",
                type: "number",
                default: 1,
            },
            {
                name: "days",
                label: "Дни проведения",
                type: "array",
                default: ["1", "2", "3", "4", "5", "6", "7"],
            },
            {
                name: "distance",
                label: "Расстояние (км)",
                type: "number",
                default: 0,
            },
            {
                name: "start",
                label: "Время начала",
                type: "text",
                default: "08:00",
            },
        ],
    },
    {
        title: "Цены и скидки",
        fields: [
            {
                name: "price",
                label: "Цена",
                type: "number",
                required: true,
                default: 0,
            },
            {
                name: "priceType",
                label: "Тип цены",
                type: "select",
                options: [
                    { value: "per_person", label: "за человека" },
                    { value: "per_trip", label: "за поездку" },
                    { value: "per_hour", label: "за час" },
                ],
                default: "per_person",
            },
            {
                name: "discount",
                label: "Скидка (%)",
                type: "number",
                default: 0,
            },
            {
                name: "discountEnd",
                label: "Скидка действует до",
                type: "date",
                default: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0],
            },
        ],
    },
    {
        title: "Описание и маркетинг",
        fields: [
            {
                name: "description",
                label: "Описание",
                type: "textarea",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "usp",
                label: "УТП",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "whyChooseUs",
                label: "Почему выбирают нас",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "guarantees",
                label: "Гарантии",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
        ],
    },

    {
        title: "Meta и SEO",
        fields: [
            {
                name: "title",
                label: "Мета заголовок",
                type: "text",
                localized: true,
                required: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "metaDescription",
                label: "Meta Description",
                type: "textarea",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "keywords",
                label: "Ключевые слова",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
        ],
    },
    {
        title: "Программа и детали",
        fields: [
            {
                name: "schedule",
                label: "Расписание",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "whatYouSee",
                label: "Что вы увидите",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "includes",
                label: "Включено в стоимость",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "whatToBring",
                label: "Что взять с собой",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "meetingPoint",
                label: "Место встречи",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
            },
        ],
    },
    {
        title: "Медиа и теги",
        fields: [
            {
                name: "images",
                label: "Изображения",
                type: "imageUploader",
                folder: "excursions",
                default: [
                    {
                        url: "/images/excursions/excursion_default.webp",
                        public_id: "default",
                    },
                ],
            },
            {
                name: "tags",
                label: "Теги",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
        ],
    },
];
