<script>
    export let title;
    export let description;
    export let image;
    export let url;
    export let price;
    export let currency;
    export let rating; // ожидается число от 1 до 5 или undefined
    export let reviewCount; // ожидается число >= 0 или undefined
    export let language;

    const hasValidRating =
        typeof rating === "number" && rating >= 1 && rating <= 5;
    const hasValidReviews = typeof reviewCount === "number" && reviewCount > 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TouristTrip",
        name: title,
        description: description,
        image: image,
        url: url,
        inLanguage: language,
        offers: {
            "@type": "Offer",
            price: price,
            priceCurrency: currency,
            availability: "https://schema.org/InStock",
        },
    };

    if (hasValidRating && hasValidReviews) {
        jsonLd.aggregateRating = {
            "@type": "AggregateRating",
            ratingValue: rating.toString(),
            reviewCount: reviewCount.toString(),
        };

        jsonLd.review = {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: rating.toString(),
            },
            author: {
                "@type": "Person",
                name: language === "ru" ? "Пользователи" : "Users",
            },
            inLanguage: language,
            itemReviewed: {
                "@type": "TouristTrip",
                name: title,
                url: url,
            },
        };
    }

    const jsonLdString = JSON.stringify(jsonLd);
</script>

{@html `<script type="application/ld+json">${jsonLdString}</script>`}
