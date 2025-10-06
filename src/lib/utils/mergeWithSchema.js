export function mergeWithSchema(schemaFields, data = {}) {
    const result = {};

    for (const field of schemaFields) {
        const { name, type, default: def, fields } = field;
        const value = data?.[name];

        if (type === "object") {
            result[name] = mergeWithSchema(fields, value || {});
        } else if (type === "array") {
            if (Array.isArray(value)) {
                result[name] = value.map((item) => {
                    if (fields?.[0]?.type === "object") {
                        return mergeWithSchema(fields[0].fields, item);
                    }
                    return item ?? def ?? null;
                });
            } else {
                result[name] = def ?? [];
            }
        } else {
            result[name] = value ?? def ?? null;
        }
    }

    return result;
}
