<!-- src\routes\(app)\[lang]\about\+page.svelte -->
<script>
    import AboutPage from "$lib/components/pages/AboutPage.svelte";
    import { appConfig } from "$lib/config/app.config";
    import SeoRenderer from "$lib/components/SEO/SeoRenderer.svelte";
    import SchemasRenderer from "$lib/components/SEO/SchemasRenderer.svelte";
    import ProductDetailRenderer from "$lib/components/pages/ProductDetailRenderer.svelte";

    export let data;
    // безопасный деструктуринг
    const { type, lang, items } = data ?? {};

    const item = appConfig.pages.about[lang]; // конфиг страницы About
</script>

<!-- SEO для страницы -->
<SeoRenderer {type} {lang} {item} />

<!-- JSON-LD схемы для списка -->
<SchemasRenderer {type} {lang} {item} />

<ProductDetailRenderer {type} {item} {lang} />

<!-- <AboutPage urlPath="about" /> -->
