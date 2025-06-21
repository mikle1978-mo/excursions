import { writable } from "svelte/store";

// Шаблон формы
export const createInitialYachtForm = () => ({
    slug: "",
    duration: "",
    groupSize: "",
    price: "",
    distance: "",
    start: "",
    discount: "",
    images: [],
    days: [],
    title: { ru: "", en: "", tr: "" },
    metaDescription: { ru: "", en: "", tr: "" },
    description: { ru: "", en: "", tr: "" },
    whatYouSee: { ru: [], en: [], tr: [] },
    includes: { ru: [], en: [], tr: [] },
    whatToBring: { ru: [], en: [], tr: [] },
    meetingPoint: { ru: "", en: "", tr: "" },
    tags: { ru: [], en: [], tr: [] },
});

// Загружаем из localStorage при наличии
let saved = null;
if (typeof localStorage !== "undefined") {
    try {
        saved = JSON.parse(localStorage.getItem("yachtFormDraft"));
    } catch (e) {
        console.warn("Ошибка чтения localStorage:", e);
    }
}

// Создаём стор (только один раз!)
export const yachtForm = writable(saved || createInitialYachtForm());

// Автосохранение в localStorage
if (typeof localStorage !== "undefined") {
    yachtForm.subscribe((value) => {
        try {
            localStorage.setItem("yachtFormDraft", JSON.stringify(value));
        } catch (e) {
            console.error("Ошибка сохранения в localStorage", e);
        }
    });
}

// Функция сброса
export function resetYachtForm() {
    yachtForm.set(createInitialYachtForm());
}
