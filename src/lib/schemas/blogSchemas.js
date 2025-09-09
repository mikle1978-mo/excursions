import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// мультиязычные типы
export const i18nString = z.object(
    Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, z.string()]))
);
export const i18nArray = z.object(
    Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(z.string())])
    )
);

/**
 * Схема статьи блога
 */
export const blogSchema = z.object({
    active: z.boolean().optional(), // опубликована или нет
    slug: z
        .string()
        .min(1, "Slug обязателен")
        .regex(
            /^[a-z0-9-_]+$/,
            "Slug должен содержать только строчные буквы, цифры, дефисы и подчеркивания"
        ),
    author: i18nString.optional(), // автор статьи
    publishDate: z.string().optional(), // дата публикации
    tags: i18nArray.optional(), // мультиязычные теги
    images: z
        .array(
            z.object({
                url: z.string(),
                public_id: z.string(),
                paragraphIndex: z.number().optional(), // после какого параграфа вставлять
                caption: i18nString.optional(), // подпись для фото
            })
        )
        .optional(),
    // основной контент — массив параграфов для каждой локали
    content: i18nArray.optional(),
    // SEO
    title: i18nString.optional(),
    h1: i18nString.optional(),
    subtitle: i18nString.optional(),
    metaDescription: i18nString.optional(),
    keywords: i18nArray.optional(),
});
