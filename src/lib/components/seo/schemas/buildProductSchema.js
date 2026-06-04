export function buildProductSchema({
    item,
    baseUrl,
    lang,
    type,
    page,
    rating,
    reviewCount,
}) {
    const typeMap = {
        excursions: "TouristTrip",
        yachts: "BoatRental",
        cars: "CarRental",
        transfers: "TaxiService",
    };
    return {
        "@context": "https://schema.org",
        "@type": "Product",

        "@id": page.product,

        name: item.title?.[lang] ?? item.title,

        image: item.images?.map((i) => i.url),

        description: item.metaDescription,

        sku: item.slug,

        url: page.id,

        category: type,

        additionalType: typeMap[type]
            ? `https://schema.org/${typeMap[type]}`
            : undefined,
        brand: {
            "@type": "Brand",
            name: "Kemer.app",
        },

        offers: {
            "@type": "Offer",
            url: page.id,
            price: item.price,
            priceCurrency: "USD",

            availability: item.active
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",

            priceValidUntil: `${new Date().getFullYear()}-12-31`,
        },

        isPartOf: {
            "@id": page.webpage,
        },

        ...(typeof rating === "number" &&
        typeof reviewCount === "number" &&
        reviewCount > 0
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: rating,
                      reviewCount: reviewCount,
                  },
              }
            : {}),
    };
}
