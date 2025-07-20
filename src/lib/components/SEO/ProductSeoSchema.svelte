<script>
    import { getLocalizedPath } from "$lib/stores/locale";

    export let item;
    export let type;
    export let locale = "en";
    export let baseUrl = "https://kemer.app";
    export let breadcrumbs = [];
    export let rating;
    export let reviewCount;
    export let brand = "Kemer.app";
    export let imageFallback = `${baseUrl}/images/excursions/excursion_default.webp`;

    const productUrl =
        baseUrl + getLocalizedPath(locale, `${type}s/${item.slug}`);
    const image = item.images?.[0]?.url ?? imageFallback;
    const title =
        item.translations?.find((t) => t.lang === locale)?.title ?? item.slug;
    const description =
        item.translations?.find((t) => t.lang === locale)?.metaDescription ??
        item.translations?.find((t) => t.lang === locale)?.description ??
        "";

    const hasValidRating =
        typeof rating === "number" && rating >= 1 && rating <= 5;
    const hasValidReviews = typeof reviewCount === "number" && reviewCount > 0;

    const now = new Date();
    const year = now.getFullYear();
    const priceValidUntil = `${year}-12-31`; // 31 декабря текущего года

    const productSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: title,
        description,
        image,
        sku: item.slug,
        url: productUrl,
        brand: {
            "@type": "Brand",
            name: brand,
        },
        category: type,
        offers: {
            "@type": "Offer",
            url: productUrl,
            price: item.price?.toString() ?? "0",
            priceCurrency: "USD",
            availability: item.active
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            priceValidUntil: priceValidUntil,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": productUrl,
        },
        ...(hasValidRating &&
            hasValidReviews && {
                aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: rating.toString(),
                    reviewCount: reviewCount.toString(),
                },
                review: {
                    "@type": "Review",
                    reviewRating: {
                        "@type": "Rating",
                        ratingValue: rating.toString(),
                        bestRating: "5",
                        worstRating: "1",
                    },
                    author: {
                        "@type": "Person",
                        name: locale === "ru" ? "Пользователь" : "User",
                    },
                    inLanguage: locale,
                },
            }),
        provider: {
            "@type": "Organization",
            name: brand,
            url: baseUrl,
        },
        areaServed: {
            "@type": "Place",
            name: "Kemer",
        },
    };

    // Генерация BreadcrumbList из переданного breadcrumbs
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => {
            let href = b.href
                ? b.href.startsWith("http")
                    ? b.href
                    : baseUrl +
                      getLocalizedPath(locale, b.href.replace(/^\/+/, ""))
                : productUrl;

            return {
                "@type": "ListItem",
                position: i + 1,
                name: b.label,
                item: href,
            };
        }),
    };

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: productUrl,
        description: description,
        inLanguage: locale,
    };
</script>

{@html `<script type="application/ld+json">${JSON.stringify(productSchema)}</script>`}
{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
{@html `<script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>`}
