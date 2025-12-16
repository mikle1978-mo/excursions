import IconClock from "$lib/icons/IconClock.svelte";
import IconGroup from "$lib/icons/IconGroup.svelte";
import IconDistance from "$lib/icons/IconDistance.svelte";
import IconStart from "$lib/icons/IconStart.svelte";
import IconBookOpen from "$lib/icons/IconBookOpen.svelte";

export const productDetailsBlock = {
    title: { ru: "Детали", en: "Details" },
    icon: IconBookOpen,
    // --- Общие поля ---
    duration: {
        label: { ru: "Длительность", en: "Duration" },
        icon: IconClock,
    },
    groupSize: {
        label: { ru: "Размер группы", en: "Group Size" },
        icon: IconGroup,
    },
    distance: {
        label: { ru: "Дистанция", en: "Distance" },
        icon: IconDistance,
    },
    start: {
        label: { ru: "Начало", en: "Start" },
        icon: IconStart,
    },

    // --- Машины ---
    brand: {
        label: { ru: "Марка", en: "brand" },
        icon: null,
    },
    model: {
        label: { ru: "Модель", en: "model" },
        icon: null,
    },
    transmission: {
        label: { ru: "Коробка", en: "transmission" },
        icon: null,
    },
    fuel: {
        label: { ru: "Топливо", en: "Fuel" },
        icon: null,
    },
    seats: {
        label: { ru: "Мест", en: "Seats" },
        icon: null,
    },
    doors: {
        label: { ru: "Дверей", en: "Doors" },
        icon: null,
    },
    luggage: {
        label: { ru: "Багаж (л)", en: "Luggage (l)" },
        icon: null,
    },
    distanceLimit: {
        label: { ru: "Лимит (км/день)", en: "Distance Limit (km/d)" },
        icon: null,
    },

    minRentalPeriodValue: {
        label: { ru: "Мин. период аренды (ч)", en: "Min Rental Period (h)" },
        icon: null,
    },

    // --- Трансфер (вложенные ключи через ".") ---
    "car.model": {
        label: { ru: "Модель машины", en: "Car Model" },
        icon: null,
    },
    "car.seats": {
        label: { ru: "Мест", en: "Seats" },
        icon: null,
    },
    "car.has_child_seats": {
        label: { ru: "Детские кресла", en: "Has child seats" },
        icon: null,
        type: "boolean",
    },
    "car.has_water": {
        label: { ru: "Бесплатная вода", en: "Has free water" },
        icon: null,
        type: "boolean",
    },
    "car.has_wifi": {
        label: { ru: "Бесплатный wi-fi", en: "Has free wi-fi" },
        icon: null,
        type: "boolean",
    },
};
