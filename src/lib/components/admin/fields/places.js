import { createLocalizedDefault } from "$lib/utils/createLocalizedDefault";

export const placeSteps = [
    {
        title: "Общие данные",
        fields: [
            {
                name: "active",
                label: "Активно",
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
        title: "Описание и контент",
        fields: [
            {
                name: "description",
                label: "Описание",
                type: "textarea",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "history",
                label: "История",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
            {
                name: "highlights",
                label: "Особенности / must-see",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
        ],
    },
    {
        title: "Гео и адрес",
        fields: [
            {
                name: "address",
                label: "Адрес",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "lat",
                label: "Широта",
                type: "number",
                default: 36897, // дефолт, можно поменять
            },
            {
                name: "lng",
                label: "Долгота",
                type: "number",
                default: 30713, // дефолт
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
                folder: "places",
                default: [
                    {
                        url: "/images/places/place_default.webp",
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
