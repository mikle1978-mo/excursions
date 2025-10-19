<script>
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import { extractKeywords } from "$lib/utils/extractKeywords";

    export let baseUrl;
    export let baseName;

    export let locale = "en"; // fallback
    export let urlPath = ""; // пример: 'cars'
    export let slug = "";
    export let keywords = "";

    export let title = "";
    export let description = "";

    export let image = `${baseUrl}/images/default.webp`;
    export let imageAlt = "Photo";

    export let amount = "";
    export let currency = "USD";
    export let availability = "in stock";
    export let brand = "";

    // Canonical + hreflang
    function getHref(lang) {
        const langPrefix = lang === "en" ? "" : `/${lang}`;
        return `${baseUrl}${langPrefix}/${urlPath}/${slug}`
            .replace(/([^:]\/)\/+/g, "$1")
            .replace(/\/+$/, "");
    }

    const canonical = getHref(locale);

    // OpenGraph locale
    const ogLocales = { ru: "ru_RU", en: "en_US" };
    const ogLocale = ogLocales[locale] || "en_US";

    // Автогенерация keywords (если прям нужны)
    const metaKeywords =
        keywords ||
        (description ? extractKeywords(description).join(", ") : "");

    // OG alternate locales
    const ogAlternateLocales = SUPPORTED_LANGUAGES.filter(
        (lang) => lang !== locale
    ).map((lang) => ogLocales[lang] || "en_US");
</script>

<svelte:head>
    <title>{title} | {baseName}</title>
    <meta name="description" content={description} />
    {#if metaKeywords}
        <meta name="keywords" content={metaKeywords} />
    {/if}

    <link rel="canonical" href={canonical} />

    {#each SUPPORTED_LANGUAGES as lang}
        {#if lang !== locale}
            <link rel="alternate" hreflang={lang} href={getHref(lang)} />
        {/if}
    {/each}
    <!-- <link rel="alternate" hreflang="x-default" href={getHref("en")} /> -->

    <!-- Open Graph -->
    <meta
        property="og:type"
        content={amount || brand || availability ? "product" : "website"}
    />
    <meta property="og:site_name" content={baseName} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:url" content={canonical} />
    <meta property="og:locale" content={ogLocale} />
    {#each ogAlternateLocales as altLocale}
        <meta property="og:locale:alternate" content={altLocale} />
    {/each}

    <!-- Product meta -->

    {#if amount}
        <meta property="product:price:amount" content={amount} />
        <meta property="product:price:currency" content={currency} />
        <meta property="product:availability" content={availability} />
        <meta property="product:condition" content="new" />
    {/if}

    {#if brand}
        <meta property="product:brand" content={brand} />
    {/if}

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
