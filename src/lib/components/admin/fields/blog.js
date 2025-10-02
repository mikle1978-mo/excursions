import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export const blogSteps = [
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
                name: "title",
                label: "Заголовок",
                type: "object",
                localized: true,
                required: true,
                default: {},
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
            },
            {
                name: "h1",
                label: "H1",
                type: "object",
                localized: true,
                required: true,
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
                localized: true,
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
        title: "Контент",
        fields: [
            {
                name: "content",
                label: "Параграф",
                type: "arrayObjects",
                default: [],
                fields: [
                    {
                        name: "text",
                        label: "Текст",
                        type: "object",
                        localized: true,
                        default: {},
                        fields: SUPPORTED_LANGUAGES.map((lang) => ({
                            name: lang,
                            label: lang.toUpperCase(),
                            type: "textarea",
                            default: "",
                        })),
                    },
                    {
                        name: "images",
                        label: "Изображениe",
                        type: "object",
                        localized: true,
                        default: {},
                        fields: SUPPORTED_LANGUAGES.map((lang) => ({
                            name: lang,
                            label: lang.toUpperCase(),
                            type: "imageUploader",
                            default: [], // массив объектов {url, public_id}
                        })),
                    },
                ],
            },
        ],
    },
    {
        title: "SEO",

        fields: [
            {
                name: "main_images",
                label: "Главное фото",
                type: "imageUploader",
                default: [], // массив объектов {url, public_id}
            },
            {
                name: "metaDescription",
                label: "Meta Description",
                type: "object",
                localized: true,
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
                localized: true,
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
                localized: true,
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
