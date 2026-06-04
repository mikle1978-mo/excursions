export function buildItemWebPageSchema({
    item,
    baseUrl,
    lang,
    type,
    page,
    seo,
}) {
    return {
        "@type": "WebPage",
        "@id": page.webpage,
        url: `${baseUrl}/${lang}/${type}/${item.slug}`,
        name: seo?.title,
        description: seo?.description,
        inLanguage: lang,
        mainEntity: {
            "@id": page.product,
        },
    };
}
