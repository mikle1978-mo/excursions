import { writable } from "svelte/store";

// Шаблон формы
export const createInitialCarForm = () => ({
    active: true,
    slug: "",
    brand: "",
    model: "",
    year: "",
    seats: "",
    doors: "",
    luggage: "",
    fuel: "",
    transmission: "",
    bodyType: "",
    price: "",
    priceType: "",
    discount: "",
    distanceLimit: "",
    minRentalPeriodValue: "",
    minRentalPeriodUnit: "hours",
    withDriver: false,
    images: [],
    availableDays: [],

    title: { ru: "", en: "", tr: "" },
    metaDescription: { ru: "", en: "", tr: "" },
    description: { ru: "", en: "", tr: "" },
    fuelPolicy: { ru: "", en: "", tr: "" },
    extraTimePolicy: { ru: "", en: "", tr: "" },
    insuranceDescription: { ru: [], en: [], tr: [] },
    includes: { ru: [], en: [], tr: [] },
    whatToBring: { ru: [], en: [], tr: [] },
    rentalConditions: { ru: [], en: [], tr: [] },
    insuranceExclusions: { ru: [], en: [], tr: [] },
    accidentInstructions: { ru: [], en: [], tr: [] },
    requiredDocuments: { ru: [], en: [], tr: [] },
    notes: { ru: [], en: [], tr: [] },
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
