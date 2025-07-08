import { writable } from "svelte/store";
import { NON_EN_LANGUAGES } from "$lib/constants/supportedLanguages";

export const locale = writable("en");

locale.subscribe((value) => {
    if (value === undefined) {
        console.error(
            "⚠ locale store обновлен в undefined!",
            new Error().stack
        );
    } else {
        console.log("✅ locale store обновлен:", value);
    }
});

export function setLocale(lang) {
    if (lang === undefined) {
        console.error("⚠ setLocale вызван с undefined!", new Error().stack);
    } else {
        console.log("✅ setLocale вызван с:", lang);
    }
    locale.set(lang);
}

/**
 * Генерирует локализованный путь с учётом того, нужен ли префикс языка
 * @param {string} locale - текущая локаль
 * @param {string} path - путь без префикса слэша (например 'cars' или 'excursions')
 * @returns {string} - локализованный URL
 */
export function getLocalizedPath(locale, path = "") {
    if (!path) {
        return locale === "en" ? "/" : `/${locale}`;
    }

    return locale === "en" ? `/${path}` : `/${locale}/${path}`;
}
