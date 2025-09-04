<script>
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import { extractKeywords } from "$lib/utils/extractKeywords";

    export let baseUrl;
    export let baseName;
    export let locale; // fallback if not passed
    export let urlPath = ""; // example: 'cars'
    export let slug = "";

    export let title = "";
    export let description = "";
    export let keywords = "";
 

    export let image = `${baseUrl}/images/default.webp`;
    export let imageAlt = "Photo";

    export let amount = "";
    export let currency = "USD";
    export let availability = "in stock";
    export let brand = "";

    // Canonical helper
    function getHref(lang) {
        const langPrefix = lang === "en" ? "" : `/${lang}`;
        return `${baseUrl}${langPrefix}/${urlPath}/${slug}`
            .replace(/([^:]\/)\/+/g, "$1")
            .replace(/\/+$/, "");
    }

    const canonical = getHref("en");

    $: metaKeywords = Array.isArray(keywords)
        ? keywords.join(", ").trim()
        : keywords?.trim()
          ? keywords.trim()
          : description?.trim()
            ? extractKeywords(description).join(", ")
            : "";
</script>

<svelte:head>
    <title>{title} | {baseName}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={metaKeywords} />

    <link rel="canonical" href={canonical} />

    {#each SUPPORTED_LANGUAGES as value}
        <link rel="alternate" hreflang={value} href={getHref(value)} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={canonical} />

    <meta property="og:type" content="product" />
    <meta property="og:site_name" content={baseName} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:url" content={getHref(locale)} />
    <meta property="og:locale" content={locale} />

    {#if amount}
        <meta property="product:price:amount" content={amount} />
        <meta property="product:price:currency" content={currency} />
    {/if}
    <meta property="product:availability" content={availability} />
    {#if brand}
        <meta property="product:brand" content={brand} />
    {/if}
    <meta property="product:condition" content="new" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
