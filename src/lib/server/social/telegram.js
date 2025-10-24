import { connectToDatabase } from "$lib/server/mongodb.js";
import {
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHANNEL_ID,
    TELEGRAM_CHANNEL_RU_ID,
} from "$env/static/private";

/**
 * Форматирование текста для Telegram
 */
function formatTelegramText({ title, description, url, lang }) {
    const readText = lang === "ru" ? "Читать на сайте" : "Read on the website";

    return `📰 <b>${title}</b>\n\n${description}\n\n👉 <a href="${url}">${readText}</a>`;
}

/**
 * Публикация поста в Telegram (в оба канала)
 */
export async function publishToTelegram({
    type,
    slug,
    title,
    description,
    url,
    url_ru,
}) {
    const db = await connectToDatabase();

    // Сообщения по языкам
    const messages = {};

    // 🇷🇺 Русский канал
    if (title?.ru && description?.ru) {
        const resRu = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHANNEL_RU_ID,
                    text: formatTelegramText({
                        title: title.ru,
                        description: description.ru,
                        url: url_ru,
                        lang: "ru",
                    }),
                    parse_mode: "HTML",
                    disable_web_page_preview: false,
                }),
            }
        );
        const dataRu = await resRu.json();
        if (dataRu.ok) messages.ru = dataRu.result.message_id;
        else console.error("Ошибка публикации RU:", dataRu);
    }

    // 🇬🇧 Английский канал
    if (title?.en && description?.en) {
        const resEn = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHANNEL_ID,
                    text: formatTelegramText({
                        title: title.en,
                        description: description.en,
                        url: url,
                        lang: "en",
                    }),
                    parse_mode: "HTML",
                    disable_web_page_preview: false,
                }),
            }
        );
        const dataEn = await resEn.json();
        if (dataEn.ok) messages.en = dataEn.result.message_id;
        else console.error("Ошибка публикации EN:", dataEn);
    }

    // Сохраняем ID сообщений в MongoDB
    await db
        .collection(type)
        .updateOne(
            { slug },
            { $set: { "social.telegram": messages } },
            { upsert: false }
        );

    return { success: true, messages };
}

/**
 * Обновление постов в Telegram
 */
export async function updateTelegramPost({
    type,
    slug,
    title,
    description,
    url,
}) {
    const db = await connectToDatabase();
    const item = await db.collection(type).findOne({ slug });
    const messages = item?.social?.telegram;
    if (!messages) return;

    // 🇷🇺 Обновляем русский пост
    if (messages.ru && title?.ru && description?.ru) {
        await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHANNEL_RU_ID,
                    message_id: messages.ru,
                    text: formatTelegramText({
                        title: title.ru,
                        description: description.ru,
                        url: url.replace("/en/", "/ru/"),
                    }),
                    parse_mode: "HTML",
                }),
            }
        );
    }

    // 🇬🇧 Обновляем английский пост
    if (messages.en && title?.en && description?.en) {
        await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHANNEL_ID,
                    message_id: messages.en,
                    text: formatTelegramText({
                        title: title.en,
                        description: description.en,
                        url: url.replace("/ru/", "/en/"),
                    }),
                    parse_mode: "HTML",
                }),
            }
        );
    }
}

/**
 * Удаление постов из Telegram
 */
export async function deleteTelegramPost(type, slug) {
    const db = await connectToDatabase();
    const item = await db.collection(type).findOne({ slug });
    const messages = item?.social?.telegram;
    if (!messages) return;

    // 🇷🇺 Удаляем пост из русского канала
    if (messages.ru) {
        await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHANNEL_RU_ID,
                    message_id: messages.ru,
                }),
            }
        );
    }

    // 🇬🇧 Удаляем пост из английского канала
    if (messages.en) {
        await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteMessage`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHANNEL_ID,
                    message_id: messages.en,
                }),
            }
        );
    }

    // Удаляем из базы
    await db
        .collection(type)
        .updateOne({ slug }, { $unset: { "social.telegram": "" } });
}
