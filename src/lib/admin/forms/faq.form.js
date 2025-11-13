import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export const faqsFormConfig = [
    {
        title: "Общие данные",
        fields: [
            {
                name: "active",
                label: "Активна",
                type: "checkbox",
                default: true,
            },
            {
                name: "slug",
                label: "Slug",
                type: "text",
                required: true,
                default: "",
            },
            {
                name: "h1",
                label: "Заголовок H1",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
            },
            {
                name: "subtitle",
                label: "Подзаголовок",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
            },
            {
                name: "duration",
                label: "Длительность (часы)",
                type: "number",
                default: 0,
            },
            {
                name: "groupSize",
                label: "Максимальная группа",
                type: "number",
                default: 1,
            },
            {
                name: "days",
                label: "Дни аренды",
                type: "array",
                default: ["1", "2", "3", "4", "5", "6", "7"],
            },
            {
                name: "distance",
                label: "Пройденное расстояние (км)",
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
                    { value: "per_trip", label: "за аренду" },
                    { value: "per_hour", label: "за час" },
                ],
                default: "per_trip",
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
                name: "title",
                label: "Название яхты",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
            },
            {
                name: "description",
                label: "Описание",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "textarea",
                    default: "",
                })),
            },
            {
                name: "usp",
                label: "УТП",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
            {
                name: "whyChooseUs",
                label: "Почему выбирают нас",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
            {
                name: "guarantees",
                label: "Гарантии",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
        ],
    },
    {
        title: "Meta и SEO",
        fields: [
            {
                name: "title",
                label: "Мета заголовок",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
            },
            {
                name: "metaDescription",
                label: "Meta Description",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "textarea",
                    default: "",
                })),
            },
            {
                name: "keywords",
                label: "Ключевые слова",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
        ],
    },
    {
        title: "Программа и детали",
        fields: [
            {
                name: "schedule",
                label: "Расписание",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
            {
                name: "whatYouSee",
                label: "Что вы увидите",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
            {
                name: "includes",
                label: "Включено в стоимость",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
            {
                name: "whatToBring",
                label: "Что взять с собой",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
            {
                name: "meetingPoint",
                label: "Место встречи",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
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
                folder: "yachts",
                default: [
                    {
                        url: "/images/yachts/yacht_default.webp",
                        public_id: "default",
                    },
                ],
            },
            {
                name: "tags",
                label: "Теги",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
        ],
    },
];
