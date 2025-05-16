import { locale } from "../stores/locale";
import { selectedCurrency, exchangeRates } from "../stores/currency";
import { derived } from "svelte/store";

export function formatPrice(priceInUSD) {
    return derived(
        [selectedCurrency, exchangeRates, locale],
        ([$selectedCurrency, $exchangeRates, $locale]) => {
            const currency = $selectedCurrency || "USD";
            const rate = $exchangeRates[currency] || 1;
            const convertedPrice = priceInUSD * rate;

            // Используем локаль на основе языка (например, ru → ru-RU)
            const localeMap = {
                USD: "en-US",
                EUR: "de-DE",
                RUB: "ru-RU",
                TRY: "tr-TR",
            };

            const formatter = new Intl.NumberFormat(
                localeMap[currency] || "en-US",
                {
                    style: "currency",
                    currency,
                    currencyDisplay: "symbol",
                    maximumFractionDigits: 2,
                }
            );

            return formatter.format(convertedPrice);
        }
    );
}
