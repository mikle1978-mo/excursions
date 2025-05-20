// src/lib/server/mongodb.js
import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

let client;
let db;

export async function connectToDatabase() {
    try {
        if (!client) {
            client = new MongoClient(env.MONGODB_URI);
            await client.connect();
            console.log("✅ Успешное подключение к MongoDB");
            db = client.db();
        }
        return db;
    } catch (e) {
        console.error("❌ Ошибка при подключении к MongoDB", e);
        throw e;
    }
}
