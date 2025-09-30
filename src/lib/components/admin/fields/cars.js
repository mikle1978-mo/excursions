import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export const carSteps = [
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
            { name: "brand", label: "Марка", type: "text", default: "" },
            { name: "model", label: "Модель", type: "text", default: "" },
            {
                name: "year",
                label: "Год выпуска",
                type: "number",
                default: new Date().getFullYear(),
            },
            { name: "seats", label: "Мест", type: "number", default: 4 },
            { name: "doors", label: "Дверей", type: "number", default: 4 },
            { name: "luggage", label: "Багаж", type: "number", default: 2 },
        ],
    },
    {
        title: "Цены и условия аренды",
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
                    { value: "per_day", label: "за день" },
                    { value: "per_hour", label: "за час" },
                    { value: "per_week", label: "за неделю" },
                ],
                default: "per_day",
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
            {
                name: "distanceLimit",
                label: "Лимит км/день",
                type: "number",
                default: 0,
            },
            {
                name: "minRentalPeriodValue",
                label: "Минимальный срок",
                type: "number",
                default: 1,
            },
            {
                name: "minRentalPeriodUnit",
                label: "Единица времени",
                type: "select",
                options: [
                    { value: "hours", label: "Часы" },
                    { value: "days", label: "Дни" },
                ],
                default: "days",
            },
            {
                name: "withDriver",
                label: "Можно с водителем",
                type: "checkbox",
                default: false,
            },
        ],
    },
    {
        title: "Описание и политика",
        fields: [
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
            {
                name: "fuelPolicy",
                label: "Политика по топливу",
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
                name: "extraTimePolicy",
                label: "Перерасход времени/км",
                type: "object",
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "textarea",
                    default: "",
                })),
            },
        ],
    },
    {
        title: "Страховка и инструкции",
        fields: [
            {
                name: "insuranceDescription",
                label: "Описание страховки",
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
                name: "accidentInstructions",
                label: "Инструкции при ДТП",
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
                name: "rentalConditions",
                label: "Условия аренды",
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
                label: "Входит в аренду",
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
                name: "insuranceExclusions",
                label: "Исключения",
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
                name: "requiredDocuments",
                label: "Документы",
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
                name: "notes",
                label: "Дополнительно",
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
        title: "Медиа и теги",
        fields: [
            {
                name: "images",
                label: "Изображения",
                type: "imageUploader",
                folder: "cars",
                default: [
                    {
                        url: "/images/cars/car_default.webp",
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
