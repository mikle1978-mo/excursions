import { createLocalizedDefault } from "$lib/utils/createLocalizedDefault";

export const transferSteps = [
    {
        title: "Общие данные",
        fields: [
            {
                name: "active",
                label: "Активен",
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
        title: "Детали трансфера",
        fields: [
            {
                name: "car",
                label: "Автомобиль",
                type: "group",
                fields: [
                    { name: "model", label: "Модель", type: "text" },
                    { name: "seats", label: "Количество мест", type: "number" },
                    {
                        name: "has_wifi",
                        label: "Wi-Fi",
                        type: "checkbox",
                        default: false,
                    },
                    {
                        name: "has_child_seats",
                        label: "Детские кресла",
                        type: "checkbox",
                        default: false,
                    },
                    {
                        name: "has_water",
                        label: "Вода",
                        type: "checkbox",
                        default: false,
                    },
                ],
            },
            {
                name: "duration",
                label: "Длительность (мин)",
                type: "number",
                default: 0,
            },
            {
                name: "days",
                label: "Дни проведения",
                type: "array",
                default: ["1", "2", "3", "4", "5", "6", "7"],
            },
            {
                name: "images",
                label: "Изображения",
                type: "imageUploader",
                folder: "transfers",
                default: [
                    {
                        url: "/images/transfers/transfer_default.webp",
                        public_id: "default",
                    },
                ],
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
            {
                name: "servicesDetails",
                label: "Детали услуг",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
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
