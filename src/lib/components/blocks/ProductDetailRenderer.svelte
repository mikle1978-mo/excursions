<script>
    import { detailComponents } from "$lib/components/blocks/detailComponents.js";
    import { appConfig } from "$lib/config/app.config";

    export let type;
    export let lang;
    export let item;
    export let rating;
    export let reviewsCount;

    const config = appConfig.collections[type]?.detailPage;

    // список секций по типу
    const sections = config?.sections ?? [];

    // универсальная функция выбора данных
    function getProps(uses, item, lang) {
        const props = { lang };

        uses.forEach((key) => {
            // поддержка мультиязычных полей
            props[key] = item[key]?.[lang] ?? item[key];
        });

        // технические поля
        props.item = item;
        props.rating = rating;
        props.reviewsCount = reviewsCount;

        return props;
    }
</script>

<div class="content">
    {#each sections as section}
        {#if detailComponents[section.component]}
            <svelte:component
                this={detailComponents[section.component]}
                {...getProps(section.uses, item, lang)}
            />
        {/if}
    {/each}
</div>

<style>
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: auto;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-bottom: 1px solid var(--color-gray-500);
    }
</style>
