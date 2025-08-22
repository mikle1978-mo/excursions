import { createLocalizedDefault } from "$lib/utils/createLocalizedDefault";

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
            {
                name: "fuelPolicy",
                label: "Политика по топливу",
                type: "textarea",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "extraTimePolicy",
                label: "Перерасход времени/км",
                type: "textarea",
                localized: true,
                default: createLocalizedDefault("text"),
            },
        ],
    },
    {
        title: "Страховка и инструкции",
        fields: [
            {
                name: "insuranceDescription",
                label: "Описание страховки",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "accidentInstructions",
                label: "Инструкции при ДТП",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "rentalConditions",
                label: "Условия аренды",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "includes",
                label: "Входит в аренду",
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
                name: "insuranceExclusions",
                label: "Исключения",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "requiredDocuments",
                label: "Документы",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "notes",
                label: "Дополнительно",
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
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
        ],
    },
];
