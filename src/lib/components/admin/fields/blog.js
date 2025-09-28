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
                        label: "Изображения",
                        type: "imageUploader",
                        default: [], // массив объектов {url, public_id}
                    },
                ],
            },
        ],
    },
    {
        title: "SEO",
        fields: [
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
                type: "array",
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
                type: "array",
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
