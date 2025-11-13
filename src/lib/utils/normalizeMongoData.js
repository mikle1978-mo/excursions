export function normalizeMongoData(doc) {
    if (!doc) return doc;
    const clone = structuredClone(doc);

    const walk = (obj) => {
        for (const key in obj) {
            const val = obj[key];
            if (!val) continue;

            // ObjectId
            if (val._bsontype === "ObjectID") {
                obj[key] = val.toString();
            }
            // Date
            else if (val instanceof Date) {
                obj[key] = val.toISOString();
            }
            // рекурсивно для объектов
            else if (typeof val === "object" && !Array.isArray(val)) {
                walk(val);
            }
            // рекурсивно для массивов
            else if (Array.isArray(val)) {
                val.forEach((v, i) => {
                    if (v && typeof v === "object") walk(v);
                });
            }
        }
    };

    walk(clone);
    return clone;
}
