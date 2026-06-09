<!-- src\lib\components\seo\SchemasRenderer.svelte -->

<script>
    import { appConfig } from "$lib/config/app.config";

    const baseUrl = import.meta.env.VITE_BASE_URL;

    export let type;
    export let lang;
    export let item = null;
    export let rating;
    export let reviewCount;
    const mode = "item";
    const url = `${baseUrl}/${lang}/${type}/${item.slug}`;

    const page = {
        id: url,
        webpage: `${baseUrl}/${lang}/${type}/${item.slug}#webpage`,
        product: `${baseUrl}/${lang}/${type}/${item.slug}#product`,
        event: `${baseUrl}/${lang}/${type}/${item.slug}#event`,
    };
    const seo = appConfig.seo[type][lang][mode];
    const context = {
        type,
        mode,
        lang,
        baseUrl,
        item,
        rating,
        reviewCount,
        page,
        seo,
    };

    const schemaFactory = appConfig.seoSchemas?.[type]?.[mode];

    const result =
        typeof schemaFactory === "function" ? schemaFactory(context) : [];

    const schemas = Array.isArray(result) ? result : result ? [result] : [];

    const graph = {
        "@context": "https://schema.org",
        "@graph": schemas,
    };

    const jsonLd = JSON.stringify(graph);
</script>

<svelte:head>
    {@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
