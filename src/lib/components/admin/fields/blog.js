import { createLocalizedDefault } from "$lib/utils/createLocalizedDefault";

export const blogSteps = [
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
                name: "author",
                label: "Автор",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "publishDate",
                label: "Дата публикации",
                type: "date",
                default: new Date().toISOString().split("T")[0],
            },
        ],
    },
    {
        title: "Контент",
        fields: [
            {
                name: "title",
                label: "Заголовок статьи",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
                required: true,
            },
            {
                name: "h1",
                label: "H1 заголовок",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "subtitle",
                label: "Подзаголовок",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
            },
            {
                name: "content",
                label: "Параграфы",
                type: "arrayParagraphs",
                localized: true, // текст на несколько языков
                default: createLocalizedDefault("array"), // [{ text: {ru, en}, image: null }]
                extra: {
                    imageUploader: true, // чтобы рендерить инпут фото внутри параграфа
                },
            },
        ],
    },
    {
        title: "SEO и мета",
        fields: [
            {
                name: "metaTitle",
                label: "Meta заголовок",
                type: "text",
                localized: true,
                default: createLocalizedDefault("text"),
                required: true,
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
                name: "tags",
                label: "Теги",
                type: "array",
                localized: true,
                default: createLocalizedDefault("array"),
            },
        ],
    },
];
