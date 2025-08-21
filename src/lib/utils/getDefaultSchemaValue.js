import { z } from "zod";

function unwrapSchema(schema) {
    while (schema instanceof z.ZodOptional || schema instanceof z.ZodNullable) {
        schema = schema._def.innerType;
    }
    return schema;
}

export function getDefaultValue(schema) {
    schema = unwrapSchema(schema);

    if (schema instanceof z.ZodObject) {
        const shape = schema.shape;
        const obj = {};
        for (const key in shape) {
            obj[key] = getDefaultValue(shape[key]);
        }
        return obj;
    }
    if (schema instanceof z.ZodString) return "";
    if (schema instanceof z.ZodNumber) return 0;
    if (schema instanceof z.ZodBoolean) return false;
    if (schema instanceof z.ZodArray) return [];
    if (schema instanceof z.ZodUnion) {
        return getDefaultValue(schema._def.options[0]);
    }
    if (schema instanceof z.ZodEnum) return schema._def.values[0];

    return null;
}
