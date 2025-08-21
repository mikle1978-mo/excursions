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

export const transferSchema = z.object({
    active: z.boolean().optional(),
    slug: z.string().min(1, "Slug обязателен"),
    price: z.union([z.string(), z.number()]).transform(Number),
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
    car: z.object({
        model: z.string(),
        seats: z.union([z.string(), z.number()]).transform(Number),
        has_wifi: z.boolean().optional(),
        has_child_seats: z.boolean().optional(),
        has_water: z.boolean().optional(),
    }),

    title: i18nString.optional(),
    subtitle: i18nString.optional(),
    usp: i18nArray.optional(),
    whyChooseUs: i18nArray.optional(),
    guarantees: i18nArray.optional(),
    metaDescription: i18nString.optional(),
    keywords: i18nArray.optional(),
    description: i18nString.optional(),
    servicesDetails: i18nArray.optional(),
    createdAt: z.string().optional(),
});
