// src/lib/services/currencyService.js
import { exchangeRates, isLoadingRates } from "$lib/stores/currency";

const url =
    "https://v6.exchangerate-api.com/v6/41a85a00c5d3e34940ff0f77/latest/USD";

// Кеш для хранения последних курсов
let ratesCache = {
    USD: 1,
    RUB: 79.13,
    EUR: 0.88,
    TRY: 39.16,
};

export async function fetchExchangeRates() {
    isLoadingRates.set(true);

    try {
        // Пытаемся получить свежие курсы
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        ratesCache = data.conversion_rates || ratesCache;

        exchangeRates.set(ratesCache);
    } catch (error) {
        console.error(
            "Failed to fetch exchange rates, using cached values:",
            error
        );
        // Используем кешированные значения при ошибке
        exchangeRates.set(ratesCache);
    } finally {
        isLoadingRates.set(false);
    }
}

// Инициализация при первом вызове
let initialized = false;

export async function initCurrencyService() {
    if (!initialized) {
        await fetchExchangeRates();
        initialized = true;
    }
}
