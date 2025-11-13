import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

const emptyI18nString = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, ""])
);

const emptyI18nArray = Object.fromEntries(
    SUPPORTED_LANGUAGES.map((lang) => [lang, []])
);

export const blogsFormConfig = [
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
                label: "H1",
                type: "object",
                localized: true,
                required: true,
                default: emptyI18nString,
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "text",
                    default: "",
                })),
            },
            {
                name: "description",
                label: "Описание",
                type: "object",
                default: {},
                localized: true,
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: lang.toUpperCase(),
                    type: "textarea",
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
                label: "Автор",
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
                name: "publishDate",
                label: "Дата публикации",
                type: "date",
                default: "",
            },
            {
                name: "images",
                label: "Главное фото",
                type: "imageUploader",
                default: [], // массив объектов {url, public_id}
            },
        ],
    },
    // {
    //     title: "Контент",
    //     fields: [
    //         {
    //             name: "content",
    //             label: "Абзацы",
    //             type: "object", // объект с языками
    //             localized: true,
    //             default: Object.fromEntries(
    //                 SUPPORTED_LANGUAGES.map((lang) => [lang, []])
    //             ),
    //             fields: SUPPORTED_LANGUAGES.map((lang) => ({
    //                 name: lang,
    //                 label: "абзацы на " + lang.toUpperCase(),
    //                 type: "array", // массив абзацев
    //                 default: [],
    //                 fields: [
    //                     {
    //                         name: "text",
    //                         label: "Текст",
    //                         type: "textarea",
    //                         default: "",
    //                     },
    //                     {
    //                         name: "image",
    //                         label: "Изображение (необязательно)",
    //                         type: "imageUploader",
    //                         default: [], // массив {url, public_id}
    //                     },
    //                 ],
    //             })),
    //         },
    //     ],
    // },
    {
        title: "Контент",
        fields: [
            {
                name: "content",
                label: "Абзацы",
                type: "object", // объект с языками
                localized: true,
                default: Object.fromEntries(
                    SUPPORTED_LANGUAGES.map((lang) => [
                        lang,
                        [
                            {
                                text: "",
                                image: [], // массив {url, public_id}
                            },
                        ],
                    ])
                ),
                fields: SUPPORTED_LANGUAGES.map((lang) => ({
                    name: lang,
                    label: "абзацы на " + lang.toUpperCase(),
                    type: "array", // массив абзацев
                    default: [
                        {
                            text: "",
                            image: [], // массив {url, public_id}
                        },
                    ],
                    fields: [
                        {
                            name: "text",
                            label: "Текст",
                            type: "textarea",
                            default: "",
                        },
                        {
                            name: "image",
                            label: "Изображение (необязательно)",
                            type: "imageUploader",
                            default: [], // массив {url, public_id}
                        },
                    ],
                })),
            },
        ],
    },
    {
        title: "SEO",
        fields: [
            {
                name: "title",
                label: "Meta Title",
                type: "object",
                localized: true,
                required: true,
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
