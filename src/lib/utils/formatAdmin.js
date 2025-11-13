// src/lib/utils/formatAdmin.js

export function formatAdminDate(dateInput) {
    if (!dateInput) return "—";
    const date = new Date(dateInput);
    if (isNaN(date)) return "—";

    return new Intl.DateTimeFormat("ru-RU", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    }).format(date);
}

export function formatAdminPrice(price) {
    if (price == null) return "—";

    return new Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(price);
}
