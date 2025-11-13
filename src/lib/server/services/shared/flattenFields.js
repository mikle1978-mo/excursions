/**
 * Вспомогательная функция: "расплющить" все поля из шагов формы
 */
export function flattenFields(steps) {
    return steps.flatMap((step) => step.fields);
}
