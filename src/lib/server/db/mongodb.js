import { MongoClient } from "mongodb";
import { env } from "$env/dynamic/private";

// Проверка переменных окружения
if (!env.MONGODB_URI) {
    throw new Error("MONGODB_URI не задан в переменных окружения");
}

// Конфигурация подключения
const MONGODB_OPTIONS = {
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 50,
    retryWrites: true,
    w: "majority",
};

// Глобальные переменные для кеширования подключения
let client;
let clientPromise;
let db;

// Инициализация подключения
function initializeMongoClient() {
    try {
        if (process.env.NODE_ENV === "development") {
            // В режиме разработки используем глобальный кеш
            if (!global._mongoClientPromise) {
                console.log("Инициализация нового подключения к MongoDB (dev)");
                client = new MongoClient(env.MONGODB_URI, MONGODB_OPTIONS);
                global._mongoClientPromise = client.connect();
            }
            clientPromise = global._mongoClientPromise;
        } else {
            // В продакшене создаем новое подключение
            console.log("Инициализация нового подключения к MongoDB (prod)");
            client = new MongoClient(env.MONGODB_URI, MONGODB_OPTIONS);
            clientPromise = client.connect();
        }
    } catch (error) {
        console.error("Ошибка при инициализации MongoDB клиента:", error);
        throw error;
    }
}

// Инициализируем подключение при импорте модуля
initializeMongoClient();

// Функция для получения подключения к БД
export async function connectToDatabase(databaseName = "tours") {
    try {
        if (!db) {
            console.log("Устанавливаем подключение к MongoDB...");
            const connectedClient = await clientPromise;
            db = connectedClient.db(databaseName);

            // Проверяем подключение
            await db.command({ ping: 1 });
            console.log("Успешное подключение к MongoDB");
        }
        return db;
    } catch (error) {
        console.error("Критическая ошибка подключения к MongoDB:", error);

        // Попытка переподключения
        try {
            console.log("Попытка переподключения...");
            initializeMongoClient();
            const connectedClient = await clientPromise;
            db = connectedClient.db(databaseName);
            await db.command({ ping: 1 });
            return db;
        } catch (retryError) {
            console.error(
                "Не удалось восстановить подключение к MongoDB:",
                retryError
            );
            throw new Error("Не удалось подключиться к базе данных");
        }
    }
}

// Обработчик для корректного закрытия подключения
process.on("SIGINT", async () => {
    try {
        if (client) {
            await client.close();
            console.log("MongoDB подключение закрыто");
        }
        process.exit(0);
    } catch (error) {
        console.error("Ошибка при закрытии подключения:", error);
        process.exit(1);
    }
});
