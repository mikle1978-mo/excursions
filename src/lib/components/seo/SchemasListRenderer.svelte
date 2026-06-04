<script>
    import { appConfig } from "$lib/config/app.config";

    const baseUrl = import.meta.env.VITE_BASE_URL;

    export let type;
    export let lang;
    export let items = null;
    const mode = "list";
    const url = `${baseUrl}/${lang}/${type}`;

    const page = {
        id: url,
        webpage: `${baseUrl}/${lang}/${type}#webpage`,
    };
    const seo = appConfig.seo[type][lang][mode];
    const context = {
        type,
        lang,
        mode,
        baseUrl,
        items,
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
