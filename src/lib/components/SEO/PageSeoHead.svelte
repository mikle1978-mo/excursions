<script>
    export let baseUrl;
    export let baseName;
    export let locale;
    export let seo = {}; // объект с title, description, keywords, twitter

    export let urlPath = ""; // например: 'excursions' или 'cars'
    export let image = `${baseUrl}/images/default.webp`; // можно передать другое
</script>

<svelte:head>
    <title>{seo.title} | {baseName}</title>
    <meta name="description" content={seo.description} />
    <meta name="keywords" content={seo.keywords} />
    <link rel="canonical" href={`${baseUrl}/${locale}/${urlPath}`} />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={baseName} />
    <meta property="og:title" content={seo.title} />
    <meta property="og:description" content={seo.description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={`${baseUrl}/${locale}/${urlPath}`} />
    <meta property="og:locale" content={locale} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={seo.title} />
    <meta name="twitter:description" content={seo.twitter || seo.description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
//плохо деплоится
