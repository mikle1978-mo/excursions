import { appConfig } from "$lib/config/app.config";

export function formatPrice(amount, currency) {
    const currencyConfig = appConfig.services.currency;

    // выбираем валюту из настроек
    const cur =
        currencyConfig.currencies[currency] ||
        currencyConfig.currencies[currencyConfig.base];

    return new Intl.NumberFormat(cur.locale, {
        style: "currency",
        currency: cur.code,
        currencyDisplay: "symbol",
        maximumFractionDigits: 2,
    }).format(amount);
}
