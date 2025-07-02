import { writable } from "svelte/store";

// Шаблон формы
export const createInitialTransferForm = () => ({
    slug: "",
    active: true,
    price: 0, // число без валюты
    priceType: "", // число без валюты
    duration: 0, // число без валюты
    car: {
        model: "",
        seats: 1,
        has_wifi: false,
        has_child_seats: false,
        has_water: false,
    },
    images: [],
    title: { ru: "", en: "", tr: "" },
    description: { ru: "", en: "", tr: "" },
    metaDescription: { ru: "", en: "", tr: "" },
    servicesDetails: { ru: [], en: [], tr: [] },
});

// Загружаем из localStorage при наличии
let saved = null;
if (typeof localStorage !== "undefined") {
    try {
        saved = JSON.parse(localStorage.getItem("transferFormDraft"));
    } catch (e) {
        console.warn("Ошибка чтения localStorage:", e);
    }
}

// Создаём стор (только один раз!)
export const transferForm = writable(saved || createInitialTransferForm());

// Автосохранение в localStorage
if (typeof localStorage !== "undefined") {
    transferForm.subscribe((value) => {
        try {
            localStorage.setItem("transferFormDraft", JSON.stringify(value));
        } catch (e) {
            console.error("Ошибка сохранения в localStorage", e);
        }
    });
}

// 👇 Добавляем setYachtForm — устанавливает всё сразу
export function setTransferForm(data) {
    transferForm.set({
        ...createInitialTransferForm(), // на случай отсутствующих полей
        ...data,
    });
}

// Функция сброса
export function resetTransferForm() {
    transferForm.set(createInitialTransferForm());
}
