<!-- src\routes\(app)\[lang]\[type]\+page.svelte -->

<script>
    import SchemasListRenderer from "$lib/components/seo/SchemasListRenderer.svelte";
    import CardList from "$lib/components/pages/CardList.svelte";
    import SeoRenderer from "$lib/components/seo/SeoRenderer.svelte";
    import SidebarFilters from "$lib/components/filters/SidebarFilters.svelte";

    export let data;
    // безопасный деструктуринг

    const { type, lang, items, rates } = data ?? {};
</script>

<!-- SEO для страницы -->
<SeoRenderer {type} {lang} />

<!-- JSON-LD схемы для списка -->
<SchemasListRenderer {type} {lang} {items} />

<SidebarFilters {type} {items} {rates} {lang} />

<!-- Список карточек -->
<CardList {type} {lang} {items} />
