import { writable } from "svelte/store";

// Шаблон формы
export const createInitialExcursionForm = () => ({
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
    meetingPoint: { ru: "", en: "", tr: "" },
    whatYouSee: { ru: [], en: [], tr: [] },
    includes: { ru: [], en: [], tr: [] },
    whatToBring: { ru: [], en: [], tr: [] },
    tags: { ru: [], en: [], tr: [] },
});

// Загружаем из localStorage при наличии
let saved = null;
if (typeof localStorage !== "undefined") {
    try {
        saved = JSON.parse(localStorage.getItem("excursionFormDraft"));
    } catch (e) {
        console.warn("Ошибка чтения localStorage:", e);
    }
}

// Создаём стор (только один раз!)
export const excursionForm = writable(saved || createInitialExcursionForm());

// Автосохранение в localStorage
if (typeof localStorage !== "undefined") {
    excursionForm.subscribe((value) => {
        try {
            localStorage.setItem("excursionFormDraft", JSON.stringify(value));
        } catch (e) {
            console.error("Ошибка сохранения в localStorage", e);
        }
    });
}

// 👇 Добавляем setYachtForm — устанавливает всё сразу
export function setExcursionForm(data) {
    excursionForm.set({
        ...createInitialExcursionForm(), // на случай отсутствующих полей
        ...data,
    });
}

// Функция сброса
export function resetExcursionForm() {
    excursionForm.set(createInitialExcursionForm());
}
