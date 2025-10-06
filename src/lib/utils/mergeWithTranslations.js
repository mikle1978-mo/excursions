export function mergeWithTranslations(item, translations, schemaFields) {
    const merged = { ...item };

    const localizedFields = schemaFields
        .filter((f) => f.localized)
        .map((f) => f.name);

    for (const field of localizedFields) {
        merged[field] = Object.fromEntries(
            translations.map((t) => [
                t.lang,
                t[field] ?? (Array.isArray(t[field]) ? [] : ""),
            ])
        );
    }

    return merged;
}
