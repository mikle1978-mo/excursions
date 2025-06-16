import { writable } from "svelte/store";

// Просто начальное значение, будет перезаписано из data.locale
export const locale = writable("ru");

// Обновление с сохранением в localStorage при ручной смене
export function setLocale(lang) {
    locale.set(lang);

    if (typeof window !== "undefined") {
        localStorage.setItem("locale", lang);
        document.cookie = `locale=${lang}; path=/; max-age=${
            60 * 60 * 24 * 30
        }; SameSite=Lax`;
    }
}
