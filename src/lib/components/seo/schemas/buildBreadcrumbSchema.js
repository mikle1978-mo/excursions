export function buildBreadcrumbSchema(context) {
    const { item, baseUrl, lang, type } = context;

    const LABELS_FALLBACK = {
        excursions: { ru: "Экскурсии", en: "Excursions" },
        yachts: { ru: "Яхты", en: "Yachts" },
        cars: { ru: "Авто", en: "Cars" },
        transfers: { ru: "Трансферы", en: "Transfers" },
        places: { ru: "Места", en: "Places" },
        blogs: { ru: "Блог", en: "Blogs" },
    };

    const typeLabel = LABELS_FALLBACK[type]?.[lang] || type;

    const breadcrumbs = [
        {
            label: lang === "en" ? "Home" : "Главная",
            href: `/${lang}`,
        },
        {
            label: typeLabel,
            href: `/${lang}/${type}`,
        },
    ];

    if (item?.slug) {
        breadcrumbs.push({
            label: item?.title?.[lang] ?? item?.title,
            href: `/${lang}/${type}/${item.slug}`,
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.label,
            item: b.href.startsWith("http") ? b.href : `${baseUrl}${b.href}`,
        })),
    };
}
