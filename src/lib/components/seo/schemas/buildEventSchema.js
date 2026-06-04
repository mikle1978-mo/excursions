export function buildEventSchema({ item, page }) {
    return {
        "@context": "https://schema.org",
        "@type": "Event",

        "@id": page.event,

        name: item.title,

        startDate: item.startDate,
        endDate: item.endDate,

        location: item.location,

        about: {
            "@id": page.product,
        },

        isPartOf: {
            "@id": page.webpage,
        },
    };
}
