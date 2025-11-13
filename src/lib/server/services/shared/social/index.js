// src/lib/server/social/index.js
import {
    publishToTelegram,
    updateTelegramPost,
    deleteTelegramPost,
} from "./telegram.js";

/**
 * Универсальная публикация в соцсети
 */
export async function publishToAllSocial(data) {
    const results = [];

    try {
        const telegramResult = await publishToTelegram(data);
        results.push({ network: "telegram", ...telegramResult });
    } catch (err) {
        console.error("Ошибка публикации в Telegram:", err);
    }

    return results;
}

/**
 * Универсальное обновление постов
 */
export async function updateAllSocial(data) {
    try {
        await updateTelegramPost(data);
    } catch (err) {
        console.error("Ошибка обновления Telegram поста:", err);
    }
}

/**
 * Универсальное удаление постов
 */
export async function deleteAllSocial(data) {
    // безопасно деструктурируем slug из data
    const { slug, type } = data;
    if (!slug) throw new Error("slug is required for deleteAll()");
    return await deleteTelegramPost({ type, slug });
}
