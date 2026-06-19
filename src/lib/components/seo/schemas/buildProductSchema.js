export function buildProductSchema({ item, baseUrl, lang, type, page }) {
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

        ...(typeof item.rating === "number" &&
        typeof item.reviewsCount === "number" &&
        item.reviewsCount > 0
            ? {
                  aggregateRating: {
                      "@type": "AggregateRating",
                      ratingValue: item.rating,
                      reviewCount: item.reviewsCount,
                  },
              }
            : {}),

        ...(item.reviews?.length
            ? {
                  review: item.reviews.map((review) => ({
                      "@type": "Review",
                      author: {
                          "@type": "Person",
                          name: review.name,
                      },
                      reviewRating: {
                          "@type": "Rating",
                          ratingValue: review.rating,
                          bestRating: "5",
                      },
                      reviewBody: review.comment,
                      datePublished: review.createdAt,
                  })),
              }
            : {}),
    };
}
