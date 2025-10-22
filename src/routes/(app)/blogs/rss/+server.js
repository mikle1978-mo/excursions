import { composeCards } from "$lib/server/cards/composeCards";
import { getCache, setCache } from "$lib/server/cache.js";
import { CACHE_TTL_SECONDS } from "$lib/constants/cacheTtlSeconds";

const CACHE_KEY = "blogs";

const channelData = {
    en: {
        title: "Kemer.app Blog",
        description:
            "Latest blog posts from Kemer.app — travel, excursions, events and tips.",
    },
    ru: {
        title: "Блог Kemer.app",
        description:
            "Последние статьи блога Kemer.app — путешествия, экскурсии, события и советы.",
    },
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
    const lang = params.lang || "en";
    const { title: channelTitle, description: channelDescription } =
        channelData[lang] || channelData.en;

    // Получаем статьи из кеша
    let items = await getCache(`${CACHE_KEY}_${lang}`);
    if (!items) {
        items = await composeCards({
            type: CACHE_KEY,
            translationCollection: `${CACHE_KEY}_translations`,
            lang,
        });
        await setCache(`${CACHE_KEY}_${lang}`, items, CACHE_TTL_SECONDS);
    }

    const makeLink = (slug) =>
        lang === "en"
            ? `https://kemer.app/blogs/${slug}`
            : `https://kemer.app/${lang}/blogs/${slug}`;

    const rssItems = items
        .map((item) => {
            const authorName = item.author?.[lang] || "";
            const authorEmail = "no-reply@kemer.app";
            const imageUrl =
                item.images?.[0]?.url ||
                item.content?.[lang]?.[0]?.image?.[0]?.url;

            return `
<item>
    <title><![CDATA[${item.title[lang]}]]></title>
    <link>${makeLink(item.slug)}</link>
    <description><![CDATA[${item.description[lang] || ""}]]></description>
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
<channel>
    <title><![CDATA[${channelTitle}]]></title>
    <link>${makeLink("")}</link>
    <description><![CDATA[${channelDescription}]]></description>
    <atom:link href="${url.href}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
</channel>
</rss>`;

    return new Response(rss, {
        headers: { "Content-Type": "application/rss+xml" },
    });
}
