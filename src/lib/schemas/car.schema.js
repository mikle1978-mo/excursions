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

export const carsSchema = z.object({
    active: z.boolean().optional(),
    slug: z.string().min(1, "Slug обязателен"), // уникальный идентификатор
    price: z.union([z.string(), z.number()]).transform(Number).optional(),
    priceType: z.enum(["per_day", "per_hour", "per_week"]).optional(),
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

    // Мультиязычные поля
    title: i18nString.optional(),
    h1: i18nString.optional(),
    subtitle: i18nString.optional(),
    usp: i18nArray.optional(),
    whyChooseUs: i18nArray.optional(),
    guarantees: i18nArray.optional(),
    metaDescription: i18nString.optional(),
    keywords: i18nArray.optional(),
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
