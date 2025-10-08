// src/lib/utils/formatDate.js

export function formatDate(dateInput, locale = "ru") {
    if (!dateInput) return "";

    const date = new Date(dateInput);
    if (isNaN(date)) return "";

    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    // корректно работает и для "ru", и для "en"
    return new Intl.DateTimeFormat(locale, options).format(date);
}
