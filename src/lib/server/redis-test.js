import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: "https://hardy-bear-40159.upstash.io",
    token: "AZzfAAIjcDE2YzIwOTI5YTE2ZWM0NmYyOTcxOWI1MmI0ZTg0MDMxOXAxMA",
});

async function test() {
    // Создаём тестовый ключ
    await redis.set("fullItem_test", JSON.stringify({ hello: "world" }));

    // Получаем все ключи fullItem_*
    const keys = await redis.keys("fullItem_*");
    console.log("Keys:", keys);

    // Получаем значение тестового ключа
    const value = await redis.get("fullItem_test");
    console.log("Value:", value);
}

test();
