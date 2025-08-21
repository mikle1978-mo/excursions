import { GET as getSlugs } from "../api/sitemap-slugs/+server.js";
import {
    SUPPORTED_LANGUAGES,
    NON_EN_LANGUAGES,
} from "$lib/constants/supportedLanguages";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

// Генератор URL с учётом структуры (без префикса для "en")
const makePath = (lang, segment = "", slug = "") => {
    const prefix = lang === "en" ? "" : `/${lang}`;
    const path = [segment, slug].filter(Boolean).join("/");

    // Если path пустой (главная страница языка)
    if (!path) {
        return `${VITE_BASE_URL}${prefix}`;
    }

    return `${VITE_BASE_URL}${prefix}/${path}`;
};

// Альтернативные языковые ссылки для <xhtml:link>
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

export async function GET() {
    const res = await getSlugs();
    const allSlugs = await res.json();

    const excursions = allSlugs.filter((item) => item.type === "excursion");
    const yachts = allSlugs.filter((item) => item.type === "yacht");
    const cars = allSlugs.filter((item) => item.type === "car");

    // Главная страница
    const homepageEntries = SUPPORTED_LANGUAGES.map(
        (lang) => `
  <url>
    <loc>${makePath(lang)}</loc>
    ${makeAltLinks()}
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`
    ).join("");

    // Списки /excursions, /cars, /yachts
    const listEntries = (segment) =>
        SUPPORTED_LANGUAGES.map(
            (lang) => `
  <url>
    <loc>${makePath(lang, segment)}</loc>
    ${makeAltLinks(segment)}
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
        ).join("");

    // Динамические маршруты /excursions/slug и т.п.
    const dynamicEntries = (items, segment) =>
        items
            .map((item) =>
                SUPPORTED_LANGUAGES.map(
                    (lang) => `
  <url>
    <loc>${makePath(lang, segment, item.slug)}</loc>
    ${makeAltLinks(segment, item.slug)}
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
                ).join("")
            )
            .join("");

    // Генерация XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${homepageEntries}
${listEntries("excursions")}
${listEntries("yachts")}
${listEntries("cars")}
${dynamicEntries(excursions, "excursions")}
${dynamicEntries(yachts, "yachts")}
${dynamicEntries(cars, "cars")}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
