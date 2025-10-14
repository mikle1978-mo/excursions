import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

const emptyI18nString = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, ""])
);

const emptyI18nArray = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, []])
);

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
                localized: true,
                default: emptyI18nString,
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
                localized: true,
                default: emptyI18nString,
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
            },
            {
                name: "author",
                label: "Автор / источник",
                type: "object",
                localized: true,
                default: emptyI18nString,
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
        title: "Описание и контент",
        fields: [
            {
                name: "description",
                label: "Описание",
                type: "object",
                localized: true,
                default: emptyI18nString,
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "textarea",
                    default: "",
                })),
            },
            {
                name: "history",
                label: "История",
                type: "object",
                localized: true,
                default: emptyI18nArray,
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "array",
                    default: [],
                })),
            },
            {
                name: "highlights",
                label: "Особенности / must-see",
                type: "object",
                localized: true,
                default: emptyI18nArray,
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
        title: "Гео и адрес",
        fields: [
            {
                name: "address",
                label: "Адрес",
                type: "object",
                localized: true,
                default: emptyI18nString,
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
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
                type: "object",
                localized: true,
                default: emptyI18nString,
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
                localized: true,
                default: emptyI18nString,
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
                localized: true,
                default: emptyI18nArray,
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
                type: "object",
                localized: true,
                default: emptyI18nArray,
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
