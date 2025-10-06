import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

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

// Контент — объект языков
const contentSchema = z.object(
    Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(paragraphSchema)])
    )
);

export const blogSchema = z.object({
    active: z.boolean(),
    slug: z.string().min(1, "Slug обязателен"),
    title: z.object(
        Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [lang, z.string().min(1)])
        )
    ),
    h1: z.object(
        Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [lang, z.string().min(1)])
        )
    ),
    subtitle: z.object(
        Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [lang, z.string().optional()])
        )
    ),
    author: z.object(
        Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [lang, z.string().optional()])
        )
    ),
    publishDate: z.string().optional(),
    content: contentSchema,
    main_images: z
        .array(z.object({ url: z.string(), public_id: z.string() }))
        .optional(),
    metaDescription: z.object(
        Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [lang, z.string().optional()])
        )
    ),
    keywords: z.object(
        Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(z.string())])
        )
    ),
    tags: z.object(
        Object.fromEntries(
            SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(z.string())])
        )
    ),
});
