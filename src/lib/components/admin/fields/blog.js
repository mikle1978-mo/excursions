import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export const blogSteps = [
    {
        title: "Общие данные",
        default: [],
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
                label: "H1 заголовок",
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
        default: [],
        fields: [
            {
                name: "content",
                label: "Параграфы",
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
                        name: "image",
                        label: "Изображение",
                        type: "text",
                        default: "",
                    },
                ],
            },
        ],
    },
    {
        title: "SEO",
        default: [],
        fields: [
            {
                name: "title",
                label: "Мета Заголовок",
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
