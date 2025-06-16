// src/lib/server/currencyCache.js
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Абсолютный путь к текущей папке
const __filename = fileURLToPath(import.meta.url);

// Путь к файлу кэша — внутри src/lib/server/cache
const CACHE_FILE = path.resolve("/tmp", "currencyCache.json");
console.log("📦 Путь к кэшу:", CACHE_FILE);

async function ensureCacheDir() {
    try {
        await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true });
    } catch (err) {
        console.error("❌ Не удалось создать директорию кэша:", err);
    }
}

export async function loadCache() {
    try {
        const data = await fs.readFile(CACHE_FILE, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.warn("⚠️ Не удалось загрузить кэш:", err.message);
        return null;
    }
}

export async function saveCache(data) {
    console.log("saveCache вызывается с данными:", data);
    try {
        await ensureCacheDir();
        await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2), "utf-8");
        console.log("✅ Курс валют сохранён в кэш:", CACHE_FILE);
    } catch (err) {
        console.error("❌ Ошибка при сохранении кэша:", err);
    }
}
