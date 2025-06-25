import { writable } from "svelte/store";

// Шаблон формы
export const createInitialCarForm = () => ({
    active: true, // Добавлено поле для активности
    slug: "",
    duration: "",
    groupSize: "",
    price: "",
    priceType: "", // Добавлено поле для типа цены
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
        saved = JSON.parse(localStorage.getItem("carFormDraft"));
    } catch (e) {
        console.warn("Ошибка чтения localStorage:", e);
    }
}

// Создаём стор (только один раз!)
export const carForm = writable(saved || createInitialCarForm());

// Автосохранение в localStorage
if (typeof localStorage !== "undefined") {
    carForm.subscribe((value) => {
        try {
            localStorage.setItem("carFormDraft", JSON.stringify(value));
        } catch (e) {
            console.error("Ошибка сохранения в localStorage", e);
        }
    });
}

// 👇 Добавляем setCarForm — устанавливает всё сразу
export function setCarForm(data) {
    carForm.set({
        ...createInitialCarForm(), // на случай отсутствующих полей
        ...data,
    });
}

// Функция сброса
export function resetCarForm() {
    carForm.set(createInitialCarForm());
}
