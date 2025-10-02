import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// --- i18n тип: только для строк ---
export const i18nString = z.object(
    Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, z.string()]))
);

// --- i18n тип: массив строк (ключевые слова, теги и т.п.) ---
export const i18nArray = z.object(
    Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(z.string())])
    )
);

// --- параграф ---
const paragraphSchema = z.object({
    text: i18nString,
    images: z
        .object(
            Object.fromEntries(
                SUPPORTED_LANGUAGES.map((lang) => [
                    lang,
                    z
                        .array(
                            z.object({
                                url: z.string(),
                                public_id: z.string(),
                            })
                        )
                        .default([]),
                ])
            )
        )
        .optional(),
});

// --- схема блога ---
export const blogSchema = z.object({
    active: z.boolean().default(true),

    slug: z
        .string()
        .min(1, "Slug обязателен")
        .regex(
            /^[a-z0-9-_]+$/,
            "Slug должен содержать только строчные буквы, цифры, дефисы и подчеркивания"
        ),

    // локализованные строки
    title: i18nString,
    h1: i18nString,
    subtitle: i18nString.optional(),
    main_images: z
        .array(
            z.object({
                url: z.string(),
                public_id: z.string(),
            })
        )
        .optional(), // необязательная картинка

    // контент — массив параграфов
    content: z.array(paragraphSchema).default([]),

    // SEO
    metaDescription: i18nString.optional(),
    keywords: i18nArray.default({}), // локализованные ключевые слова
    tags: i18nArray.default({}), // локализованные теги

    // необязательные доп. поля
    author: i18nString.optional(),
    publishDate: z.string().optional(), // ISO-дата
});
