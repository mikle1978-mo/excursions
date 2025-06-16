import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI не задан в переменных окружения");
}

let client;
let clientPromise;
let db;

if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    if (!global._mongoClientPromise) {
        console.log("Создаём новый MongoClient и промис подключения (dev)");
        client = new MongoClient(env.MONGODB_URI);
        // @ts-ignore
        global._mongoClientPromise = client.connect();
    } else {
        // @ts-ignore
        console.log("Используем кешированный промис подключения (dev)");
    }
    // @ts-ignore
    clientPromise = global._mongoClientPromise;
} else {
    console.log("Создаём новый MongoClient и промис подключения (prod)");
    client = new MongoClient(env.MONGODB_URI);
    clientPromise = client.connect();
}

export async function connectToDatabase() {
    try {
        if (!db) {
            console.log("Ожидаем подключения к MongoDB...");
            const connectedClient = await clientPromise;
            console.log("Подключение успешно");
            db = connectedClient.db(); // Если нужно, здесь можно указать имя БД
        } else {
            console.log("Используем уже существующее подключение к базе");
        }
        return db;
    } catch (error) {
        console.error("Ошибка при подключении к MongoDB:", error);
        throw error;
    }
}
