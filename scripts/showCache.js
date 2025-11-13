import "dotenv/config";
import { redis } from "../src/lib/server/db/redis.js";

async function showAllKeys() {
    let cursor = 0;

    do {
        // просто передаём курсор
        const res = await redis.scan(cursor);
        cursor = Number(res[0]); // новый курсор
        const keys = res[1]; // найденные ключи

        for (const key of keys) {
            const value = await redis.get(key);
            console.log(key, ":", value);
        }
    } while (cursor !== 0);
}

showAllKeys();
