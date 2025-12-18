<!-- src\routes\(app)\[lang]\[type]\+page.svelte -->

<script>
    import SeoRenderer from "$lib/components/SEO/SeoRenderer.svelte";
    import SchemasRenderer from "$lib/components/SEO/SchemasRenderer.svelte";
    import CardList from "$lib/components/pages/CardList.svelte";
    import FiltersBlock from "$lib/components/blocks/page/FiltersBlock.svelte";

    export let data;
    // безопасный деструктуринг
    const { type, lang, items } = data ?? {};
</script>

<!-- SEO для страницы -->
<SeoRenderer {type} {lang} />

<!-- JSON-LD схемы для списка -->
<SchemasRenderer {type} {lang} {items} />

<!-- Блок фильтров, если они есть -->
<FiltersBlock {type} {lang} {items} />

<!-- Список карточек -->
<CardList {type} {lang} {items} />
