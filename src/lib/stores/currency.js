// src/lib/stores/currency.js
import { writable } from "svelte/store";

// текущая валюта
export const selectedCurrency = writable("USD");

// функция для смены валюты
export function setCurrency(val) {
    selectedCurrency.set(val);
}
