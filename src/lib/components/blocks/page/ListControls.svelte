<!-- src\lib\components\blocks\page\FiltersBlock.svelte -->
<script>
    import { onMount } from "svelte";
    import { appConfig } from "$lib/config/app.config";
    import Search from "$lib/components/ui/inputs/search/Search.svelte";
    import SortControls from "$lib/components/filters/SortControls.svelte";
    import FilterButton from "$lib/components/ui/buttons/FilterButton.svelte";

    export let type;
    export let lang;

    const config = appConfig.list[type];

    let visible = true;
    let lastY = 0;
    let ticking = false;

    let container;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }

    onMount(() => {
        container = document.querySelector(".main_page");

        lastY = container.scrollTop;

        container.addEventListener("scroll", onScroll, { passive: true });

        return () => container.removeEventListener("scroll", onScroll);
    });

    function update() {
        const y = container.scrollTop;

        if (y < 10) {
            visible = true;
        } else if (y > lastY) {
            visible = false;
        } else {
            visible = true;
        }

        lastY = y;
        ticking = false;
    }
</script>

<div class="list-controls {visible ? '' : 'hidden'}">
    {#if config?.toolbar?.search}
        <Search {lang} />
    {/if}

    {#if config?.toolbar?.sort?.length}
        <SortControls options={config.toolbar.sort} {type} {lang} />
    {/if}

    {#if config?.toolbar?.showFiltersButton}
        <FilterButton />
    {/if}
</div>

<style>
    .list-controls {
        position: sticky;
        top: 0;
        margin-top: var(--space-vertical-xs);
        display: flex;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: var(--space-horizontal-xs);
        padding: 0 var(--space-horizontal-sm);
        width: 100%;
        height: 32px;
        transition:
            transform 0.25s ease,
            opacity 0.25s ease;
        z-index: 100;
    }

    .hidden {
        transform: translateY(-100%);
        opacity: 0;
    }
</style>
