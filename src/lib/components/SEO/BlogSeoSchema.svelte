<script>
    import { getLocalizedPath } from "$lib/stores/locale";

    export let item;
    export let locale = "ru";
    export let breadcrumbs = [];

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const brand = "Kemer.app";

    // Определяем перевод
    const translation =
        item.translations?.find((t) => t.lang === locale) ??
        item.translations?.find((t) => t.lang === "en") ??
        {};

    const title = translation.title ?? item.slug;
    const description =
        translation.metaDescription ??
        translation.subtitle ??
        translation.description ??
        "";
    const image =
        item.images?.[0]?.url ?? `${baseUrl}/images/blogs/blogs_default.webp`;
    const articleUrl = baseUrl + getLocalizedPath(locale, `blog/${item.slug}`);

    const datePublished = item.createdAt
        ? new Date(item.createdAt).toISOString()
        : undefined;
    const dateModified = item.updatedAt
        ? new Date(item.updatedAt).toISOString()
        : datePublished;

    const authorName =
        translation.author ??
        (locale === "ru" ? "Редакция Kemer.app" : "Kemer.app Team");

    // Основная схема статьи
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        alternativeHeadline: translation.subtitle ?? undefined,
        description,
        image,
        url: articleUrl,
        datePublished,
        dateModified,
        inLanguage: locale,
        author: {
            "@type": "Person",
            name: authorName,
        },
        publisher: {
            "@type": "Organization",
            name: brand,
            url: baseUrl,
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/images/logo.png`,
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
        },
    };

    // Хлебные крошки
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => {
            const href = b.href
                ? b.href.startsWith("http")
                    ? b.href
                    : baseUrl +
                      getLocalizedPath(locale, b.href.replace(/^\/+/, ""))
                : articleUrl;

            return {
                "@type": "ListItem",
                position: i + 1,
                name: b.label,
                item: href,
            };
        }),
    };

    // Сама страница
    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        url: articleUrl,
        description,
        inLanguage: locale,
    };
</script>

{@html `<script type="application/ld+json">${JSON.stringify(articleSchema, null, 2)}</script>`}
{@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema, null, 2)}</script>`}
{@html `<script type="application/ld+json">${JSON.stringify(webPageSchema, null, 2)}</script>`}
