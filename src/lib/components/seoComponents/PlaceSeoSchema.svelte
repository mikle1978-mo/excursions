<script>
    import { getLocalizedPath } from "$lib/stores/locale";
    export let item;

    export let locale = "en";
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let breadcrumbs = [];

    const translation =
        item.translations?.find((t) => t.lang === locale) ??
        item.translations?.find((t) => t.lang === "en") ??
        {};

    const title = translation.title ?? item.slug;
    const description =
        translation.metaDescription ?? translation.subtitle ?? "";
    const image =
        item.images?.[0]?.url ?? `${baseUrl}/images/places/places_default.webp`;
    const placeUrl = baseUrl + getLocalizedPath(locale, `places/${item.slug}`);

    const hasCoordinates = item.lat != null && item.lng != null;
    const latNum = hasCoordinates && item.lat > 90 ? item.lat / 1000 : item.lat;
    const lngNum =
        hasCoordinates && item.lng > 180 ? item.lng / 1000 : item.lng;

    const datePublished = item.createdAt
        ? new Date(item.createdAt).toISOString()
        : undefined;

    const placeSchema = {
        "@context": "https://schema.org",
        "@type": "Place",
        name: title,
        description,
        image,
        url: placeUrl,
        address: translation.address ?? undefined,
        geo: hasCoordinates
            ? {
                  "@type": "GeoCoordinates",
                  latitude: latNum,
                  longitude: lngNum,
              }
            : undefined,
        founder: translation.author
            ? { "@type": "Person", name: translation.author }
            : undefined,
        datePublished,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": placeUrl,
        },
        provider: {
            "@type": "Organization",
            name: "Kemer.app",
            url: baseUrl,
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => {
            const href = b.href
                ? b.href.startsWith("http")
                    ? b.href
                    : baseUrl +
                      getLocalizedPath(locale, b.href.replace(/^\/+/, ""))
                : placeUrl;

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
        url: placeUrl,
        description,
        inLanguage: locale,
    };
</script>

{@html `<script type="application/ld+json">${JSON.stringify(placeSchema)}</script>`}
{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`}
{@html `<script type="application/ld+json">${JSON.stringify(webPageSchema)}</script>`}
