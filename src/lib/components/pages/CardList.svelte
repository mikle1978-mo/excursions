<!-- src\lib\components\pages\CardList.svelte -->
<script>
    import CardRenderer from "$lib/components/cards/CardRenderer.svelte";
    import ListControls from "$lib/components/blocks/page/ListControls.svelte";
    import { appConfig } from "$lib/config/app.config";
    import { sortStore, resetSort } from "$lib/stores/sortStore.js";
    import { filterState } from "$lib/stores/filterState";
    import { searchQuery } from "$lib/stores/searchQuery.js";

    import { applyFilters } from "$lib/utils/filterEngine";
    import { applySearch } from "$lib/utils/searchEngine";
    import { applySort } from "$lib/utils/sortEngine";
    import { onDestroy } from "svelte";

    export let type;
    export let items = [];
    export let lang;

    $: config = appConfig.list[type];

    // Инициализируй дефолт синхронно при первом получении конфига
    $: if ($sortStore === null && config?.toolbar?.defaultSort) {
        sortStore.set(config.toolbar.defaultSort);
    }

    $: filtersConfig = config.filters || {};
    $: searchFields = config?.toolbar?.searchFields || [];

    // STORE
    $: state = $filterState;
    $: query = $searchQuery;
    $: sort = $sortStore;

    // PIPELINE (ВЕСЬ ФИЛЬТР ЗДЕСЬ)
    $: processed = applySort(
        applySearch(
            applyFilters(items, filtersConfig, state),
            query,
            searchFields,
        ),
        sort,
    );

    onDestroy(() => sortStore.set(null));
</script>

<main class="main_page">
    <ListControls {type} {lang} {items} />

    <h1 class="title">
        {config?.listText?.[lang]?.h1}
    </h1>

    <div class="description-block">
        {@html config?.listText?.[lang]?.topText}
    </div>

    <div class="grid">
        {#each processed as item (item.slug)}
            <CardRenderer {item} {type} {lang} />
        {/each}
    </div>

    <div class="description-block">
        {@html config?.listText?.[lang]?.bottomText}
    </div>
</main>

<style>
    .main_page {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
        width: 100%;
    }

    .title {
        margin-top: var(--space-vertical-xs);
        text-align: center;
        font-size: var(--text-xl);
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-vertical-sm);
        width: 100%;
        align-items: center;
    }

    /* 414+ — 1 колонка (карточка красиво помещается) */
    @media (min-width: 414px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }
    @media (min-width: 480px) {
        .grid {
            gap: var(--space-vertical-md);
        }
    }

    /* 576+ — 2 колонки */
    @media (min-width: 576px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* 768+ — 2 колонки (можешь оставить 2, если не хочешь мельчить) */
    @media (min-width: 768px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* 992+ — 3 колонки */
    @media (min-width: 992px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    /* 1200+ — 4 колонки */
    @media (min-width: 1200px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }

    /* 1440+ — 5 колонок (или оставь 4, если плотность не нравится) */
    @media (min-width: 1440px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
    }

    .description-block {
        color: var(--color-gray-700);
        line-height: 1.6;
        margin: 1em 0;
    }

    /* Стили для всего HTML контента внутри блока */
    .description-block :global(p) {
        margin-bottom: var(--space-vertical-sm);
        font-size: var(--text-md);
        line-height: 1.6;
    }

    .description-block :global(p:first-letter) {
        color: var(--color-primary);
        font-weight: 700;
    }

    .description-block :global(strong) {
        color: var(--color-accent);
        font-weight: 700;
    }

    .description-block :global(em) {
        font-style: italic;
    }

    .description-block :global(u) {
        text-decoration: underline;
    }

    .description-block :global(a) {
        color: var(--color-primary);
        text-decoration: none;
    }

    .description-block :global(a:hover) {
        text-decoration: underline;
    }

    .description-block :global(ul) {
        padding-left: 1.5em;
        list-style: disc;
        margin: 0.5em 0;
    }

    .description-block :global(ol) {
        padding-left: 1.5em;
        margin: 0.5em 0;
    }

    .description-block :global(li) {
        margin-bottom: 0.3em;
        line-height: 1.5;
    }

    .description-block :global(h1) {
        font-size: var(--text-xxl);
        font-weight: 700;
        margin: 1em 0 0.5em 0;
    }

    .description-block :global(h2) {
        font-size: var(--text-xl);
        font-weight: 600;
        margin: 0.8em 0 0.4em 0;
    }

    .description-block :global(h3) {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0.6em 0 0.3em 0;
    }

    .description-block :global(blockquote) {
        border-left: 4px solid var(--color-primary);
        padding-left: 1em;
        margin: 1em 0;
        font-style: italic;
    }

    /* Темная тема */
    @media (prefers-color-scheme: dark) {
        .description-block {
            color: var(--color-gray-300);
        }

        .description-block :global(.dropcap) {
            color: var(--color-primary);
        }

        .description-block :global(strong) {
            color: var(--color-accent);
        }
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        h1 {
            padding: 0 var(--space-horizontal-sm);
        }
        .description-block :global(p) {
            padding: 0 var(--space-horizontal-sm);
            font-size: var(--text-sm);
            line-height: 1.5;
        }

        .description-block :global(.dropcap) {
            font-size: 2.5em;
        }

        .description-block :global(h1) {
            font-size: var(--text-xl);
        }

        .description-block :global(h2) {
            font-size: var(--text-lg);
        }

        .description-block :global(h3) {
            font-size: var(--text-md);
        }
    }
</style>
