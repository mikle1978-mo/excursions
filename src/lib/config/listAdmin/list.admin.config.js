// src/lib/config/listsAdmin/list.admin.config.js
import { formatAdminDate, formatAdminPrice } from "$lib/utils/formatAdmin";

// Общие поля, которые повторяются везде
const baseFields = [
    { name: "active", label: "Активен" },
    { name: "title", label: "Название", lang: true },
    { name: "slug", label: "Слаг (URL)" },
    {
        name: "createdAt",
        label: "Создано",
        format: (val) => formatAdminDate(val, "ru"), // админка всегда на русском
    },
    {
        name: "updatedAt",
        label: "Обновлено",
        format: (val) => formatAdminDate(val, "ru"),
    },
];

// Общие поля с ценой и скидкой
const priceFields = [
    {
        name: "price",
        label: "Цена",
        format: (val) => formatAdminPrice(val, "RUB"),
    },
    { name: "discount", label: "Скидка" },
];

// Конфиг по типам коллекций
export const listAdmin = {
    excursions: {
        fields: [
            ...baseFields.slice(0, 2), // title
            ...priceFields, // price + discount
            ...baseFields.slice(2), // active, slug, createdAt, updatedAt
        ],
    },
    yachts: {
        fields: [
            ...baseFields.slice(0, 2),
            ...priceFields,
            ...baseFields.slice(2),
        ],
    },
    cars: {
        fields: [
            ...baseFields.slice(0, 2),
            ...priceFields,
            ...baseFields.slice(2),
        ],
    },
    transfers: {
        fields: [...baseFields],
    },
    places: {
        fields: [...baseFields],
    },
    blogs: {
        fields: [...baseFields],
    },
    faqs: {
        fields: [...baseFields],
    },
};
