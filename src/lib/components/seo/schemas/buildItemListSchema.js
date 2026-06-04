export function buildItemListSchema(context) {
    const { items = [], baseUrl, lang, type } = context;

    return {
        "@context": "https://schema.org",
        "@type": "ItemList",

        itemListElement: items.map((item, index) => {
            const url = `${baseUrl}/${lang}/${type}/${item.slug}`;

            // базовое имя (универсально для всех типов)
            const name = item.title?.[lang] ?? item.title;

            // определяем тип сущности (минимально и безопасно)
            const entityType = getEntityType(type);

            return {
                "@type": "ListItem",
                position: index + 1,
                item: {
                    "@type": entityType,
                    name,
                    url,
                },
            };
        }),
    };
}

function getEntityType(type) {
    switch (type) {
        case "excursions":
            return "Event";

        case "cars":
        case "yachts":
            return "Product";

        case "transfers":
            return "Service";

        case "places":
            return "Place";

        case "blogs":
            return "Article";

        default:
            return "Thing";
    }
}
