// src/lib/server/services/items/itemsHelpers.js
export function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}

export function isLocalizedField(name, steps) {
    return steps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}

// Универсальная функция для подготовки локализованных данных перед записью
export function prepareTranslations(data, steps, slug, SUPPORTED_LANGUAGES) {
    const localizedFields = steps.flatMap((step) =>
        step.fields.filter((f) => f.localized)
    );

    return SUPPORTED_LANGUAGES.map((lang) => {
        const t = { itemSlug: slug, lang };

        for (const field of localizedFields) {
            const value = data[field.name];

            if (Array.isArray(value) && field.type === "array") {
                t[field.name] = value.map((item) => item?.[lang] || {});
            } else if (value && typeof value === "object") {
                t[field.name] = value[lang] ?? "";
            } else {
                t[field.name] = Array.isArray(field.default) ? [] : "";
            }
        }
        return t;
    });
}
