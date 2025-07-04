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

export const carSchema = z.object({
    active: z.boolean().optional(),

    slug: z.string().min(1, "Slug обязателен"), // уникальный идентификатор
    brand: z.string().optional(), // Марка: Toyota
    model: z.string().optional(), // Модель: Corolla
    year: z.union([z.string(), z.number()]).transform(Number).optional(),

    seats: z.union([z.string(), z.number()]).transform(Number).optional(), // Мест
    doors: z.union([z.string(), z.number()]).transform(Number).optional(), // Дверей
    luggage: z.union([z.string(), z.number()]).transform(Number).optional(), // Багаж

    fuel: z.enum(["petrol", "diesel", "hybrid", "electric"]).optional(),
    transmission: z.enum(["automatic", "manual"]).optional(),
    bodyType: z
        .enum(["sedan", "suv", "hatchback", "van", "pickup", "convertible"])
        .optional(),

    price: z.union([z.string(), z.number()]).transform(Number).optional(),
    priceType: z.enum(["per_day", "per_hour", "per_week"]).optional(),

    discount: z.union([z.string(), z.number()]).transform(Number).optional(),
    distanceLimit: z
        .union([z.string(), z.number()])
        .transform(Number)
        .optional(), // км/день
    minRentalPeriodValue: z
        .union([z.string(), z.number()])
        .transform(Number)
        .optional(),
    minRentalPeriodUnit: z.enum(["hours", "days"]).optional(),

    withDriver: z.boolean().optional(), // Можно ли с водителем

    images: z
        .array(
            z.object({
                url: z.string(),
                public_id: z.string(),
            })
        )
        .optional(),
    availableDays: z.array(z.union([z.string(), z.number()])).optional(),

    // Мультиязычные поля
    title: i18nString.optional(),
    metaDescription: i18nString.optional(),
    description: i18nString.optional(),
    fuelPolicy: i18nString.optional(), // Политика по топливу
    extraTimePolicy: i18nString.optional(), // как считать перерасход (описание)
    // Массивы с мультиязычными строками
    insuranceDescription: i18nArray.optional(), // Детальное описание страховки
    accidentInstructions: i18nArray.optional(), //Инструкции при ДТП
    rentalConditions: i18nArray.optional(), // Условия
    includes: i18nArray.optional(), // Входит в аренду
    whatToBring: i18nArray.optional(), // Что нужно
    insuranceExclusions: i18nArray.optional(), // Перечень исключений
    requiredDocuments: i18nArray.optional(), // Паспорт, ВУ, возраст, стаж
    notes: i18nArray.optional(), // Любые дополнительные условия
    tags: i18nArray.optional(),
});
