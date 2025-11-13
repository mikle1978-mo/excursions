// src/lib/utils/createInitialFormFromConfig.js
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";

/**
 * Рекурсивное построение дефолтных значений из поля
 */
function buildDefaultFromField(field) {
    // 1️⃣ Если есть default — возвращаем его
    if (field.default !== undefined) {
        // клонируем объект/массив, чтобы не было мутаций
        if (Array.isArray(field.default)) return [...field.default];
        if (typeof field.default === "object" && field.default !== null)
            return structuredClone(field.default);
        return field.default;
    }

    // 2️⃣ Если это локализованное поле — создаём объект вида { ru: "", en: "" }
    if (field.localized && field.fields) {
        const obj = {};
        for (const sub of field.fields) {
            obj[sub.name] = buildDefaultFromField(sub);
        }
        return obj;
    }

    // 3️⃣ Если это объект с вложенными полями (без локализации)
    if (field.type === "object" && field.fields) {
        const obj = {};
        for (const sub of field.fields) {
            obj[sub.name] = buildDefaultFromField(sub);
        }
        return obj;
    }

    // 4️⃣ Если это массив
    if (field.type === "array") return [];

    // 5️⃣ Базовый дефолт по типу
    switch (field.type) {
        case "checkbox":
            return false;
        case "number":
            return 0;
        default:
            return "";
    }
}

/**
 * Собирает объект дефолтных значений из конфига формы
 */
export function createInitialFormFromConfig(formConfig) {
    const result = {};

    for (const section of formConfig) {
        for (const field of section.fields) {
            result[field.name] = buildDefaultFromField(field);
        }
    }

    return result;
}
