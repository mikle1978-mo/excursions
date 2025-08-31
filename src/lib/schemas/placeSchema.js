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

/**
 * Схема валидации "мест" (достопримечательности, точки интереса)
 */
export const placeSchema = z.object({
    active: z.boolean().optional(),
    slug: z
        .string()
        .min(1, "Slug обязателен")
        .regex(
            /^[a-z0-9-_]+$/,
            "Slug должен содержать только строчные буквы, цифры, дефисы и подчеркивания"
        ),

    images: z
        .array(
            z.object({
                url: z.string(),
                public_id: z.string(),
            })
        )
        .optional(),

    // Базовые характеристики
    title: i18nString.optional(), // Название места
    h1: i18nString.optional(), // H1 (может отличаться от title)
    subtitle: i18nString.optional(), // Подзаголовок
    description: i18nString.optional(), // Основное описание
    history: i18nArray.optional(), // История / факты о месте
    highlights: i18nArray.optional(), // Чем примечательно (особенности, «must-see»)
    author: i18nString.optional(), // Чем примечательно (особенности, «must-see»)

    // Гео-инфо
    lat: z.union([z.string(), z.number()]).transform(Number).optional(),
    lng: z.union([z.string(), z.number()]).transform(Number).optional(),

    address: i18nString.optional(),

    // SEO
    metaDescription: i18nString.optional(),
    keywords: i18nArray.optional(),
    tags: i18nArray.optional(),
});
