import { VITE_BASE_URL } from "$env/static/private";

const SUPPORTED_LOCALES = ["ru", "en"];

export async function GET() {
    const res = await fetch(`${VITE_BASE_URL}/api/slugs`);
    if (!res.ok) {
        return new Response("Ошибка при получении данных", { status: 500 });
    }

    const slugs = await res.json();

    // Главные страницы
    const homepageEntries = `
  <url>
    <loc>${VITE_BASE_URL}/en/</loc>
    <xhtml:link rel="alternate" hreflang="ru" href="${VITE_BASE_URL}/ru" />
    <xhtml:link rel="alternate" hreflang="en" href="${VITE_BASE_URL}/en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en" />
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

    // Страница списка экскурсий
    const excursionsListEntries = SUPPORTED_LOCALES.map(
        (lang) => `
  <url>
    <loc>${VITE_BASE_URL}/${lang}/excursions</loc>
    ${SUPPORTED_LOCALES.map(
        (altLang) =>
            `<xhtml:link rel="alternate" hreflang="${altLang}" href="${VITE_BASE_URL}/${altLang}/excursions" />`
    ).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en/excursions" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    ).join("");

    // Страница списка яхт
    const yachtsListEntries = SUPPORTED_LOCALES.map(
        (lang) => `
  <url>
    <loc>${VITE_BASE_URL}/${lang}/yachts</loc>
    ${SUPPORTED_LOCALES.map(
        (altLang) =>
            `<xhtml:link rel="alternate" hreflang="${altLang}" href="${VITE_BASE_URL}/${altLang}/yachts" />`
    ).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en/yachts" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    ).join("");

    // Страница списка яхт
    const carsListEntries = SUPPORTED_LOCALES.map(
        (lang) => `
  <url>
    <loc>${VITE_BASE_URL}/${lang}/cars</loc>
    ${SUPPORTED_LOCALES.map(
        (altLang) =>
            `<xhtml:link rel="alternate" hreflang="${altLang}" href="${VITE_BASE_URL}/${altLang}/cars" />`
    ).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en/cars" />
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    ).join("");

    // Экскурсии
    const excursionEntries = slugs
        .map((slug) => {
            const path = `excursions/${slug}`;
            const hreflangs = SUPPORTED_LOCALES.map(
                (lang) =>
                    `<xhtml:link rel="alternate" hreflang="${lang}" href="${VITE_BASE_URL}/${lang}/${path}" />`
            ).join("\n");

            return `
  <url>
    <loc>${VITE_BASE_URL}/en/${path}</loc>
    ${hreflangs}
    <xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en/${path}" />
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        })
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${homepageEntries}
${excursionsListEntries}
${yachtsListEntries}
${carsListEntries}
${excursionEntries}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
