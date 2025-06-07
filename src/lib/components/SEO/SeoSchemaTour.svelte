<script>
    export let title;
    export let description;
    export let image;
    export let url;
    export let price;
    export let currency;
    export let rating;
    export let reviewCount;
    export let language;

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
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (rating ?? 0).toString(),
            reviewCount: (reviewCount ?? 0).toString(),
        },
    };

    if (reviewCount > 0) {
        jsonLd.review = {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: (rating ?? 0).toString(),
            },
            author: {
                "@type": "Person",
                name: language === "ru" ? "Пользователи" : "Users",
            },
            inLanguage: language,
        };
    }

    const jsonLdString = JSON.stringify(jsonLd);
</script>

{@html `<script type="application/ld+json">${jsonLdString}</script>`}
