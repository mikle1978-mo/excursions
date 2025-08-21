import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export function createLocalizedField(initialValue) {
    return SUPPORTED_LANGUAGES.reduce((acc, lang) => {
        acc[lang] = Array.isArray(initialValue) ? [] : initialValue;
        return acc;
    }, {});
}
