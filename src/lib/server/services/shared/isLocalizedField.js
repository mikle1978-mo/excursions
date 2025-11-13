/**
 * Проверка, локализованное ли поле
 */
export function isLocalizedField(name, steps) {
    return steps.some((step) =>
        step.fields.some((field) => field.name === name && field.localized)
    );
}
