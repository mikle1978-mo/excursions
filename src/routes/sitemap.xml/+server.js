import { GET as getSlugs } from "../api/sitemap-slugs/+server.js";
import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
import { ObjectId } from "mongodb"; // <-- для извлечения времени из _id

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

const makePath = (lang, segment = "", slug = "") => {
    const prefix = lang === "en" ? "" : `/${lang}`;
    const path = [segment, slug].filter(Boolean).join("/");
    return path
        ? `${VITE_BASE_URL}${prefix}/${path}`
        : `${VITE_BASE_URL}${prefix}`;
};

const makeAltLinks = (segment = "", slug = "") =>
    SUPPORTED_LANGUAGES.map(
        (lang) =>
            `<xhtml:link rel="alternate" hreflang="${lang}" href="${makePath(
                lang,
                segment,
                slug
            )}" />`
    ).join("\n") +
    `\n<xhtml:link rel="alternate" hreflang="x-default" href="${makePath(
        "en",
        segment,
        slug
    )}" />`;

// Форматирование даты в ISO (например: 2025-10-06)
const formatDate = (date) => new Date(date).toISOString().split("T")[0];

export async function GET() {
    const res = await getSlugs();
    const allSlugs = await res.json();

    const excursions = allSlugs.filter((i) => i.type === "excursion");
    const yachts = allSlugs.filter((i) => i.type === "yacht");
    const cars = allSlugs.filter((i) => i.type === "car");
    const transfers = allSlugs.filter((i) => i.type === "transfer");
    const places = allSlugs.filter((i) => i.type === "place");
    const blogs = allSlugs.filter((i) => i.type === "blog");

    const today = formatDate(new Date());
    const HOMEPAGE_LASTMOD = "2025-10-06";
    const getListLastmod = (items) => {
        if (!items.length) return today;
        const timestamps = items.map((i) =>
            i.updatedAt
                ? new Date(i.updatedAt).getTime()
                : i.createdAt
                ? new Date(i.createdAt).getTime()
                : i._id
                ? new ObjectId(i._id).getTimestamp().getTime()
                : 0
        );
        return formatDate(new Date(Math.max(...timestamps)));
    };

    const homepageEntries = SUPPORTED_LANGUAGES.map(
        (lang) => `
  <url>
    <loc>${makePath(lang)}</loc>
    ${makeAltLinks()}
    <lastmod>${HOMEPAGE_LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
    ).join("");

    const listEntries = (segment, items) => {
        const lastmod = getListLastmod(items);
        return SUPPORTED_LANGUAGES.map(
            (lang) => `
  <url>
    <loc>${makePath(lang, segment)}</loc>
    ${makeAltLinks(segment)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
        ).join("");
    };

    const dynamicEntries = (items, segment) =>
        items
            .map((item) => {
                // 1) prefer updatedAt
                // 2) fallback to createdAt
                // 3) fallback to ObjectId timestamp (если createdAt нет)
                // 4) в крайнем случае today
                let lastmod;
                if (item.updatedAt) {
                    lastmod = formatDate(item.updatedAt);
                } else if (item.createdAt) {
                    lastmod = formatDate(item.createdAt);
                } else if (item._id) {
                    try {
                        // item._id может быть строкой или ObjectId — ObjectId ctor умеет принимать строку
                        lastmod = formatDate(
                            new ObjectId(item._id).getTimestamp()
                        );
                    } catch (e) {
                        lastmod = today;
                    }
                } else {
                    lastmod = today;
                }

                return SUPPORTED_LANGUAGES.map(
                    (lang) => `
  <url>
    <loc>${makePath(lang, segment, item.slug)}</loc>
    ${makeAltLinks(segment, item.slug)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
                ).join("");
            })
            .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${homepageEntries}
${listEntries("excursions", excursions)}
${listEntries("yachts", yachts)}
${listEntries("cars", cars)}
${listEntries("transfers", transfers)}
${listEntries("places", places)}
${listEntries("blogs", blogs)}
${dynamicEntries(excursions, "excursions")}
${dynamicEntries(yachts, "yachts")}
${dynamicEntries(cars, "cars")}
${dynamicEntries(transfers, "transfers")}
${dynamicEntries(places, "places")}
${dynamicEntries(blogs, "blogs")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
