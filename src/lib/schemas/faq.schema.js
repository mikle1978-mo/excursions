import { z } from "zod";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

// список поддерживаемых языков
// i18n типы
export const i18nString = z.object(
    Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, z.string()]))
);
export const i18nArray = z.object(
    Object.fromEntries(
        SUPPORTED_LANGUAGES.map((lang) => [lang, z.array(z.string())])
    )
);

export const faqsSchema = z.object({
    active: z.boolean().optional(),
    slug: z.string().min(1, "Slug обязателен"), // 🔐 единственное обязательное
    price: z.union([z.string(), z.number()]).transform(Number).optional(),
    priceType: z.enum(["per_person", "per_trip", "per_hour"]).optional(),
    discount: z.union([z.string(), z.number()]).transform(Number).optional(),
    images: z
        .array(
            z.object({
                url: z.string(),
                public_id: z.string(),
            })
        )
        .optional(),
    days: z.array(z.union([z.string(), z.number()])).optional(),
    duration: z.union([z.string(), z.number()]).transform(Number).optional(),
    groupSize: z.union([z.string(), z.number()]).transform(Number).optional(),
    distance: z.union([z.string(), z.number()]).transform(Number).optional(),
    start: z.string().optional(),

    title: i18nString.optional(),
    h1: i18nString.optional(),
    subtitle: i18nString.optional(),
    usp: i18nArray.optional(),
    whyChooseUs: i18nArray.optional(),
    schedule: i18nArray.optional(),
    guarantees: i18nArray.optional(),
    metaDescription: i18nString.optional(),
    keywords: i18nArray.optional(),
    description: i18nString.optional(),
    whatYouSee: i18nArray.optional(),
    includes: i18nArray.optional(),
    whatToBring: i18nArray.optional(),
    meetingPoint: i18nString.optional(),
    tags: i18nArray.optional(),
});
