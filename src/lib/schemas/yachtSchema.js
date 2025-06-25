import { z } from "zod";

const i18nString = z.object({
    ru: z.string(),
    en: z.string(),
    tr: z.string(),
});

const i18nArray = z.object({
    ru: z.array(z.string()),
    en: z.array(z.string()),
    tr: z.array(z.string()),
});

export const yachtSchema = z.object({
    active: z.boolean().optional(),
    slug: z.string().min(1, "Slug обязателен"), // 🔐 единственное обязательное
    duration: z.union([z.string(), z.number()]).transform(Number).optional(),
    groupSize: z.union([z.string(), z.number()]).transform(Number).optional(),
    price: z.union([z.string(), z.number()]).transform(Number).optional(),
    priceType: z.enum(["per_person", "per_trip", "per_hour"]).optional(),
    distance: z.union([z.string(), z.number()]).transform(Number).optional(),
    start: z.string().optional(),
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

    title: i18nString.optional(),
    metaDescription: i18nString.optional(),
    description: i18nString.optional(),
    whatYouSee: i18nArray.optional(),
    includes: i18nArray.optional(),
    whatToBring: i18nArray.optional(),
    meetingPoint: i18nString.optional(),
    tags: i18nArray.optional(),
});
