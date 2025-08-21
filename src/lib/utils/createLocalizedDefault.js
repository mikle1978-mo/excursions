import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export function createLocalizedDefault(type, defaultValue) {
    if (defaultValue !== undefined) return defaultValue;
    if (type === "array")
        return SUPPORTED_LANGUAGES.reduce((acc, lang) => {
            acc[lang] = [];
            return acc;
        }, {});
    return SUPPORTED_LANGUAGES.reduce((acc, lang) => {
        acc[lang] = "";
        return acc;
    }, {});
}
