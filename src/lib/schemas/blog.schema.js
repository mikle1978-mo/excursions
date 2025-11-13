import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// i18n типы
export const i18nString = z.object(
    Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, z.string()]))
);

export const i18nArray = z.object(
    Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(z.string())])
    )
);

// Контент
const paragraphSchema = z.object({
    text: z.string().min(1, "Текст обязателен"),
    image: z
        .array(
            z.object({
                url: z.string(),
                public_id: z.string(),
            })
        )
        .optional(),
});

const contentSchema = z.object(
    Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(paragraphSchema)])
    )
);

// Схема блога
export const blogsSchema = z.object({
    active: z.boolean().optional(),
    slug: z.string().min(1, "Slug обязателен"),
    title: i18nString.optional(),
    h1: i18nString.optional(),
    subtitle: i18nString.optional(),
    description: i18nString.optional(),
    author: i18nString.optional(),
    publishDate: z.string().optional(),
    content: contentSchema,
    images: z
        .array(z.object({ url: z.string(), public_id: z.string() }))
        .optional(),
    metaDescription: i18nString.optional(),
    keywords: i18nArray.optional(),
    tags: i18nArray.optional(),
});
