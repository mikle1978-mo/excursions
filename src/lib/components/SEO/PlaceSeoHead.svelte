<script>
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import { extractKeywords } from "$lib/utils/extractKeywords";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let locale; // fallback
    export let slug = "";

    export let title = "";
    export let description = "";
    export let keywords = "";

    export let image = `${baseUrl}/images/places/place_default.webp`;
    export let imageAlt = "Photo";

    const urlPath = "places";

    console.log("key", keywords);

    function getHref(lang) {
        const langPrefix = lang === "en" ? "" : `/${lang}`;
        return `${baseUrl}${langPrefix}/${urlPath}/${slug}`
            .replace(/([^:]\/)\/+/g, "$1")
            .replace(/\/+$/, "");
    }

    const canonical = getHref("en");

    $: metaKeywords =
        keywords ||
        (description ? extractKeywords(description).join(", ") : "");
</script>

<svelte:head>
    <title>{title} | {baseName}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={metaKeywords} />

    <link rel="canonical" href={canonical} />
    {#each SUPPORTED_LANGUAGES as lang}
        <link rel="alternate" hreflang={lang} href={getHref(lang)} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:type" content="place" />
    <meta property="og:site_name" content={baseName} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:url" content={getHref(locale)} />
    <meta property="og:locale" content={locale} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
