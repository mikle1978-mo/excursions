export function buildItemListSchema(context) {
    const { items = [], baseUrl, lang, type } = context;

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",

        itemListElement: items.map((item, index) => {
            const url = `${baseUrl}/${lang}/${type}/${item.slug}`;
            const name = item.title?.[lang] ?? item.title;

            return {
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@id": url, // 🔥 КЛЮЧЕВОЕ ИСПРАВЛЕНИЕ
                    "@type": getEntityType(type),
                    name,
                    url,
                },
            };
        }),
    };
}
