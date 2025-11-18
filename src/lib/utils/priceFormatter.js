import { currencyConfig } from "$lib/config/services/currency.config.js";

export function formatPrice(amount, currency) {
    const cur =
        currencyConfig.currencies[currency] ||
        currencyConfig.currencies[currencyConfig.base];

    return new Intl.NumberFormat(cur.locale, {
        style: "currency",
        currency,
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    }).format(amount);
}
