<script>
    import { locale } from "$lib/stores/locale";
    import { get } from "svelte/store";

    export let baseUrl = "";
    export let baseName = "";
    export let urlPath = ""; // например cars
    export let slug = ""; // добавляем для формирования canonical

    export let title = "";
    export let description = "";
    export let keywords = "";

    export let image = "";
    export let imageAlt = "Photo";

    export let amount = "";
    export let currency = "USD";
    export let availability = "in stock";
    export let brand = "";

    // Собираем canonical
    $: canonical =
        `${baseUrl.replace(/\/+$/, "")}/${$locale}/${urlPath}/${slug}`
            .replace(/([^:]\/)\/+/g, "$1")
            .replace(/\/+$/, "");
</script>

<svelte:head>
    <title>{title} | {baseName}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <link rel="canonical" href={canonical} />

    <!-- Open Graph -->
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content={baseName} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={imageAlt} />
    <meta property="og:url" content={canonical} />
    <meta property="og:locale" content={$locale} />

    {#if amount}
        <meta property="product:price:amount" content={amount} />
        <meta property="product:price:currency" content={currency} />
    {/if}
    <meta property="product:availability" content={availability} />
    {#if brand}
        <meta property="product:brand" content={brand} />
    {/if}
    <meta property="product:condition" content="new" />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
</svelte:head>
