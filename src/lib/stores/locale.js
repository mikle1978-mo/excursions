import { writable } from "svelte/store";

const getStoredLang = () => {
    if (typeof window !== "undefined") {
        const lang = localStorage.getItem("locale");
        if (lang) return lang;
    }
    return null;
};

const getBrowserLang = () => {
    if (typeof navigator !== "undefined") {
        return navigator.language.startsWith("en") ? "en" : "ru";
    }
    return "ru";
};

const initialLang = getStoredLang() || getBrowserLang();

export const locale = writable(initialLang);

locale.subscribe((lang) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("locale", lang);
    }
});

export function setLocale(lang) {
    locale.set(lang);
}
