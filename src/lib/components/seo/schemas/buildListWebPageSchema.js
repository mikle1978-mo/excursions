export function buildListWebPageSchema({ baseUrl, lang, type, page, seo }) {
    return {
        "@type": "WebPage",
        "@id": page.webpage,
        url: `${baseUrl}/${lang}/${type}`,
        name: seo?.title,
        description: seo?.description,
        inLanguage: lang,
    };
}
