import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
import { ZodObject } from "zod";

function getLocalizedFieldsFromSchema(schema) {
    const shape = schema.shape || schema._def.shape(); // зависит от версии Zod

    const localized = [];

    for (const [key, value] of Object.entries(shape)) {
        if (value instanceof ZodObject) {
            const keys = Object.keys(value.shape);
            // Проверяем, что ключи совпадают с языками
            const isLocalized = SUPPORTED_LANGUAGES.every((lang) =>
                keys.includes(lang)
            );
            if (isLocalized) localized.push(key);
        }
    }

    return localized;
}
