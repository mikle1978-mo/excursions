// utils/priceFormatter.js
import { appConfig } from "$lib/config/app.config";

export function formatPrice(amount, currencyCode) {
    const currencyConfig = appConfig.services.currency;

    const cur =
        currencyConfig.currencies[currencyCode] ||
        currencyConfig.currencies[currencyConfig.base];

    return new Intl.NumberFormat(cur.locale, {
        style: "currency",
        currency: cur.code,
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    }).format(amount);
}
