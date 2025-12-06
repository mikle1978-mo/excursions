// src/lib/stores/universalFormStore.js
import { writable } from "svelte/store";
import { get } from "svelte/store";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

/**
 * Генерация ключа для localStorage
 * @param {string} type - тип сущности ("excursion", "car", "yacht")
 * @param {string} slug - slug записи или "new" для новой
 */
export const getStorageKey = (type = "excursion", slug = "new") =>
    `${type}FormDraft-${slug}`;

/**
 * Создание универсального сторa для формы
 * @param {string} type - тип сущности
 * @param {string} slug - slug записи или "new"
 * @param {object} initialForm - дефолтная форма (из схемы/конфига)
 */
export function createFormStore(type, slug, initialForm) {
    const key = getStorageKey(type, slug);

    let saved = null;
    if (typeof localStorage !== "undefined") {
        try {
            saved = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.warn("Ошибка чтения localStorage:", e);
        }
    }

    const store = writable(saved || initialForm);

    // Автосохранение в localStorage
    if (typeof localStorage !== "undefined") {
        store.subscribe((value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error("Ошибка сохранения в localStorage", e);
            }
        });
    }

    return store;
}

/**
 * Установить данные в форму (например, при редактировании)
 * @param {Writable} store - стор формы
 * @param {object} data - новые данные
 * @param {string} type - тип сущности
 * @param {string} slug - slug записи
 */
export function setFormData(store, data, type = "excursion", slug = "new") {
    const current = get(store);

    const allKeys = Array.from(
        new Set([...Object.keys(current), ...Object.keys(data)])
    );
    const merged = {};

    allKeys.forEach((key) => {
        const currentVal = current[key];
        let dataVal = data[key];

        if (key === "slug" && (!dataVal || dataVal === "")) {
            // если slug нет в data, берём аргумент
            dataVal = slug;
        }

        if (
            (currentVal &&
                typeof currentVal === "object" &&
                !Array.isArray(currentVal)) ||
            (dataVal && typeof dataVal === "object" && !Array.isArray(dataVal))
        ) {
            merged[key] = { ...(currentVal || {}), ...(dataVal || {}) };

            SUPPORTED_LANGUAGES.forEach((lang) => {
                if (!(lang in merged[key])) merged[key][lang] = "";
            });
        } else {
            merged[key] = dataVal !== undefined ? dataVal : currentVal;
        }
    });

    store.set(merged);

    if (typeof localStorage !== "undefined") {
        localStorage.removeItem(getStorageKey(type, slug));
    }
    const currentForm = get(store);
}

/**
 * Сбросить форму к дефолтному состоянию
 * @param {Writable} store - стор формы
 * @param {object} initialForm - дефолтная форма
 * @param {string} type - тип сущности
 * @param {string} slug - slug записи
 */
export function resetForm(
    store,
    initialForm,
    type = "excursion",
    slug = "new"
) {
    store.set(initialForm);
    if (typeof localStorage !== "undefined") {
        localStorage.removeItem(getStorageKey(type, slug));
    }
}
