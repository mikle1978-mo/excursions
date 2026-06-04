import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

export function getLocaleFromPath(pathname) {
    const segments = pathname.split("/").filter(Boolean);

    return SUPPORTED_LANGUAGES.includes(segments[0]) ? segments[0] : "en";
}

export function setLocaleInPath(pathname, lang) {
    const segments = pathname.split("/").filter(Boolean);

    const currentLocale = SUPPORTED_LANGUAGES.includes(segments[0])
        ? segments[0]
        : null;

    if (currentLocale) {
        segments[0] = lang;
    } else {
        segments.unshift(lang);
    }

    return "/" + segments.join("/");
}
