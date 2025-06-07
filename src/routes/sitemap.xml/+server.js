import { VITE_BASE_URL } from "$env/static/private";

const SUPPORTED_LOCALES = ["ru", "en", "tr"];

export async function GET() {
    const res = await fetch(`${VITE_BASE_URL}/api/slugs`);
    if (!res.ok) {
        return new Response("Ошибка при получении данных", { status: 500 });
    }

    const slugs = await res.json();
    console.log("====================================");
    console.log(slugs);
    console.log("====================================");

    const urls = slugs
        .map((slug) => {
            const path = `excursions/${slug}`;
            const links = SUPPORTED_LOCALES.map(
                (lang) =>
                    `<xhtml:link rel="alternate" hreflang="${lang}" href="${VITE_BASE_URL}/${lang}/${path}" />`
            ).join("\n");

            const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${VITE_BASE_URL}/en/${path}" />`;

            return `
  <url>
    <loc>${VITE_BASE_URL}/en/${path}</loc>
    ${links}
    ${xDefault}
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
${urls}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
