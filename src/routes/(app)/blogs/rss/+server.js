import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "blogs";

const channelData = {
    en: {
        title: "Kemer.app Blog",
        description:
            "Latest blog posts from Kemer.app — travel, excursions, events and tips.",
        lang: "en-US",
        rssPath: "/blogs/rss",
    },
    ru: {
        title: "Блог Kemer.app",
        description:
            "Последние статьи блога Kemer.app — путешествия, экскурсии, события и советы.",
        lang: "ru-RU",
        rssPath: "/ru/blogs/rss",
    },
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
    const langKey = params.lang || "en";
    const {
        title: channelTitle,
        description: channelDescription,
        lang,
        rssPath,
    } = channelData[langKey] || channelData.en;

    // Получаем статьи из кеша
    let items = await getCache(`${CACHE_KEY}_${langKey}`);
    if (!items) {
        items = await composeCards({
            type: CACHE_KEY,
            translationCollection: `${CACHE_KEY}_translations`,
            lang: langKey,
        });
        await setCache(`${CACHE_KEY}_${langKey}`, items, CACHE_TTL_SECONDS);
    }

    const makeLink = (slug) =>
        langKey === "en"
            ? `https://kemer.app/blogs/${slug}`
            : `https://kemer.app/${langKey}/blogs/${slug}`;

    const rssItems = items
        .map((item) => {
            const authorName = item.author?.[langKey] || "";
            const authorEmail = "no-reply@kemer.app";
            const imageUrl =
                item.images?.[0]?.url ||
                item.content?.[langKey]?.[0]?.image?.[0]?.url;

            return `
<item>
    <title><![CDATA[${item.title[langKey]}]]></title>
    <link>${makeLink(item.slug)}</link>
    <description><![CDATA[${item.description[langKey] || ""}]]></description>
    <pubDate>${new Date(
        item.publishDate || item.createdAt
    ).toUTCString()}</pubDate>
    <guid isPermaLink="true">${makeLink(item.slug)}</guid>
    ${authorName ? `<author>${authorEmail} (${authorName})</author>` : ""}
    ${imageUrl ? `<enclosure url="${imageUrl}" type="image/jpeg" />` : ""}
</item>`;
        })
        .join("");

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel xml:lang="${lang}">
    <title><![CDATA[${channelTitle}]]></title>
    <link>${makeLink("")}</link>
    <description><![CDATA[${channelDescription}]]></description>
    <atom:link href="https://kemer.app${rssPath}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <image>
    <url>https://kemer.app/images/blogs/blog_default.webp</url>
    <title><![CDATA[Kemer.app Blog]]></title>
    <link>https://kemer.app/</link>
</image>

    ${rssItems}
</channel>
</rss>`;

    return new Response(rss, {
        headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
    });
}
