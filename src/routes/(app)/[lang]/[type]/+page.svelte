<script>
    import SeoRenderer from "$lib/components/seo/SeoRenderer.svelte";
    import SchemasRenderer from "$lib/components/seo/SchemasRenderer.svelte";
    import CardList from "$lib/components/blocks/CardList.svelte";
    import FiltersBlock from "$lib/components/blocks/FiltersBlock.svelte";

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
