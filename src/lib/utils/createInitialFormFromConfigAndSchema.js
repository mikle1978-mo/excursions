export function createInitialFormFromConfigAndSchema(steps, schema) {
    const defaults = getDefaultValue(schema);
    const form = {};

    for (const step of steps) {
        for (const field of step.fields) {
            const baseName = field.name.split(".")[0];

            if (field.name.includes(".")) {
                // Если мультиязычное поле, создаём объект по baseName один раз
                if (!(baseName in form)) {
                    form[baseName] =
                        defaults[baseName] &&
                        typeof defaults[baseName] === "object"
                            ? defaults[baseName]
                            : createLocalizedField(
                                  Array.isArray(field.initialValue) ? [] : ""
                              );
                }
                // НЕ создаём отдельное поле с точкой в форме
                continue;
            }

            // Если это простое поле, создаём только если нет объекта с таким baseName (чтобы не перезаписать мультиязычное)
            if (
                !(field.name in form) &&
                !(field.name in form && typeof form[field.name] === "object")
            ) {
                form[field.name] =
                    defaults[field.name] ?? field.initialValue ?? "";
            }
        }
    }

    return form;
}
