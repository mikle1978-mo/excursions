import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const selectedCurrency = writable("USD");

export function setCurrency(value) {
    selectedCurrency.set(value);

    if (browser) {
        document.cookie = `currency=${value}; path=/; max-age=31536000`;
        localStorage.setItem("currency", value);
    }
}

export function initCurrency(valueFromServer) {
    selectedCurrency.set(valueFromServer);
}
