export function buildEventSchema({ item, baseUrl, lang, type }) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 3);
    startDate.setHours(14, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 5);

    const url = `${baseUrl}/${lang}/${type}/${item.slug}`;

    return {
        "@context": "https://schema.org",
        "@type": "Event",

        "@id": url + "#event",
        name: item.title,

        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),

        eventStatus: "https://schema.org/EventScheduled",

        location: {
            "@type": "Place",
            name: item.location?.name || "Antalya",
        },

        image: item.images?.[0],

        description: item.description || item.title,

        offers: {
            "@type": "Offer",
            price: item.price || 0,
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            url,
        },
    };
}
