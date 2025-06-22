import { GET as getSlugs } from "../api/sitemap-slugs/+server.js";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

const SUPPORTED_LOCALES = ["ru", "en"];

export async function GET() {
    const res = await getSlugs();
    const allSlugs = await res.json();

    const excursions = allSlugs.filter((item) => item.type === "excursion");
    const yachts = allSlugs.filter((item) => item.type === "yacht");
    const cars = allSlugs.filter((item) => item.type === "car");

    const homepageEntries = `
  <url>
    <loc>${VITE_BASE_URL}/en</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="${VITE_BASE_URL}/ru" />
    <xhtml:link rel="alternate" hreflang="en" href="${VITE_BASE_URL}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${VITE_BASE_URL}/ru</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="${VITE_BASE_URL}/ru" />
    <xhtml:link rel="alternate" hreflang="en" href="${VITE_BASE_URL}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>   
  `;

    const listEntries = (segment) =>
        SUPPORTED_LOCALES.map(
            (lang) => `
  <url>
    <loc>${VITE_BASE_URL}/${lang}/${segment}</loc>
    ${SUPPORTED_LOCALES.map(
        (altLang) =>
            `<xhtml:link rel="alternate" hreflang="${altLang}" href="${VITE_BASE_URL}/${altLang}/${segment}" />`
    ).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en/${segment}" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
        ).join("");

    const dynamicEntries = (items, segment) =>
        items
            .map((item) =>
                SUPPORTED_LOCALES.map((lang) => {
                    const hrefs = SUPPORTED_LOCALES.map(
                        (altLang) =>
                            `<xhtml:link rel="alternate" hreflang="${altLang}" href="${VITE_BASE_URL}/${altLang}/${segment}/${item.slug}" />`
                    ).join("\n");

                    return `
  <url>
    <loc>${VITE_BASE_URL}/${lang}/${segment}/${item.slug}</loc>
    ${hrefs}
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en/${segment}/${item.slug}" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
                }).join("")
            )
            .join("");

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
