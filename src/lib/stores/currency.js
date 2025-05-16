// src/lib/stores/currency.js
import { writable } from "svelte/store";

const isBrowser = typeof window !== "undefined";
const storedCurrency = isBrowser
    ? localStorage.getItem("selectedCurrency") || "USD"
    : "USD";

// Хранилище выбранной валюты
export const selectedCurrency = writable(storedCurrency);

// Хранилище курсов валют
export const exchangeRates = writable({
    USD: 1,
    RUB: 90,
    EUR: 0.92,
});

// Хранилище состояния загрузки
export const isLoadingRates = writable(false);

// Обновление валюты + запись в localStorage
export function setCurrency(currency) {
    selectedCurrency.set(currency);
    if (isBrowser) {
        localStorage.setItem("selectedCurrency", currency);
    }
}
