import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export const transfersFormConfig = [
    {
        title: "Общие данные",
        fields: [
            {
                name: "active",
                label: "Активен",
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
        title: "Детали трансфера",
        fields: [
            {
                name: "car",
                label: "Автомобиль",
                type: "object",
                default: {},
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
            {
                name: "servicesDetails",
                label: "Детали услуг",
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
