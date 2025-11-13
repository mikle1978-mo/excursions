import { exchangeRates, isLoadingRates } from "$lib/stores/currency";

// Инициализация при первом вызове
let initialized = false;

export async function fetchExchangeRates() {
    isLoadingRates.set(true);

    try {
        const res = await fetch("/api/currency");
        if (!res.ok) throw new Error(`Failed to load rates: ${res.status}`);

        const data = await res.json();

        // Обновляем состояние
        exchangeRates.set(data.rates);
    } catch (err) {
        console.error("Failed to fetch exchange rates:", err);
        // Не меняем exchangeRates — можно добавить дефолтные значения при необходимости
    } finally {
        isLoadingRates.set(false);
    }
}

export async function initCurrencyService() {
    if (!initialized) {
        await fetchExchangeRates();
        initialized = true;
    }
}
