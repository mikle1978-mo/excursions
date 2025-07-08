<script>
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    export let baseUrl;
    export let baseName;
    export let locale; // 'en', 'ru', 'tr'
    export let seo = {};
    export let urlPath = "";
    export let image = `${baseUrl}/images/default.webp`;

    function getHref(lang) {
        if (lang === "en") {
            return `${baseUrl}/${urlPath}`;
        }
        return `${baseUrl}/${lang}/${urlPath}`;
    }
</script>

<svelte:head>
    <title>{seo.title} | {baseName}</title>
    <meta name="description" content={seo.description} />
    <meta name="keywords" content={seo.keywords} />

    <link rel="canonical" href={getHref("en")} />

    {#each SUPPORTED_LANGUAGES as value}
        <link rel="alternate" hreflang={value} href={getHref(value)} />
    {/each}
    <link rel="alternate" hreflang="x-default" href={getHref("en")} />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={baseName} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={getHref(locale)} />
    <meta property="og:locale" content={locale} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.twitter || seo.description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
