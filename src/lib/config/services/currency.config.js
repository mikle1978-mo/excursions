// src/lib/config/services/currency.config.js
export const currencyConfig = {
    enabled: true, // включено/выключено
    base: "USD", // базовая валюта
    target: ["TRY", "EUR", "USD", "RUB"], // какие нужны
    apiUrl: "https://v6.exchangerate-api.com/v6/41a85a00c5d3e34940ff0f77/latest/USD",
    ttl: 30 * 60, // 30 минут (в секундах)
    cacheKey: "currency_rates",
    fallbackRates: {
        USD: 1,
        EUR: 0.9,
        TRY: 34,
        RUB: 80,
    },
    currencies: {
        // ⚡ все данные для форматирования
        USD: { symbol: "$", locale: "en-US" },
        EUR: { symbol: "€", locale: "de-DE" },
        TRY: { symbol: "₺", locale: "tr-TR" },
        RUB: { symbol: "₽", locale: "ru-RU" },
    },
};
