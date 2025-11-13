import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: "https://hardy-bear-40159.upstash.io",
    token: "AZzfAAIjcDE2YzIwOTI5YTE2ZWM0NmYyOTcxOWI1MmI0ZTg0MDMxOXAxMA",
});

async function debugCache() {
    try {
        const keys = await redis.keys("fullItem_*"); // REST scan нестабилен
        console.log(`Найдено ключей: ${keys.length}\n`);

        for (const key of keys) {
            const value = await redis.get(key);
            let isValid = true;

            // Проверяем JSON, если это строка
            if (typeof value === "string") {
                try {
                    JSON.parse(value);
                } catch {
                    isValid = false;
                }
            }

            // Выводим значение
            console.log(
                `${key} => ${
                    typeof value === "string"
                        ? value.slice(0, 200) +
                          (value.length > 200 ? "..." : "")
                        : JSON.stringify(value)
                } ${isValid ? "" : "❌ НЕВАЛИДНЫЙ JSON"}`
            );

            // Удаляем невалидный JSON
            if (!isValid) {
                await redis.del(key);
                console.log(`Удалён невалидный ключ: ${key}`);
            }
        }

        console.log("\n✅ Проверка кеша завершена.");
    } catch (err) {
        console.error("Ошибка при работе с Redis:", err);
    }
}

debugCache();
