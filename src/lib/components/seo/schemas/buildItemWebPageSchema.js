export function buildItemWebPageSchema({
    item,
    baseUrl,
    lang,
    type,
    page,
    seo,
}) {
    const title = seo?.title?.replace(
        "{{title}}",
        item.title?.[lang] ?? item.title,
    );
    const description = seo?.description?.replace(
        "{{metaDescription}}",
        item.metaDescription?.[lang] ?? item.metaDescription,
    );

    return {
        "@type": "WebPage",
        "@id": page.webpage,
        url: `${baseUrl}/${lang}/${type}/${item.slug}`,
        name: title,
        description: description,
        inLanguage: lang,
        mainEntity: {
            "@id": page.product,
        },
    };
}
