<!-- src\routes\(app)\[lang]\[type]\[slug]\+page.svelte -->

<script>
    import SeoRenderer from "$lib/components/seo/SeoRenderer.svelte";
    import SchemasRenderer from "$lib/components/seo/SchemasRenderer.svelte";
    import ProductDetailRenderer from "$lib/components/pages/ProductDetailRenderer.svelte";

    export let data;
    const { item, type, lang } = data;
</script>

<!-- SEO для страницы -->
<SeoRenderer {type} {lang} {item} />

<!-- JSON-LD схемы для страницы -->
<SchemasRenderer {type} {lang} {item} />

<ProductDetailRenderer {type} {item} {lang} />
