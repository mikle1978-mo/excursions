// src/lib/constants/supportedLanguages.js

export const SUPPORTED_LANGUAGES = ["en", "ru"];

export const NON_EN_LANGUAGES = SUPPORTED_LANGUAGES.filter(
    (lang) => lang !== "en"
);

export const LANG_META = {
    ru: { label: "Русский", flag: "🇷🇺", locale: "ru-RU" },
    en: { label: "English", flag: "en", locale: "en-US" },
};
