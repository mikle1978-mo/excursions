<script>
    import Card from "$lib/components/cards/Card.svelte";
    import PlacesCard from "../cards/PlacesCard.svelte";
    import SidebarFilters from "$lib/components/filters/SidebarFilters.svelte";
    import PageSeoHead from "$lib/components/SEO/PageSeoHead.svelte";
    import InfoBlock from "$lib/components/layout/InfoBlock.svelte";
    import { useServiceFilters } from "$lib/hooks/useServiceFilters.js";
    import { resetFilters, setFilters } from "$lib/stores/filters.js";
    import { onMount } from "svelte";
    import { locale as localeStore } from "$lib/stores/locale.js";
    import Scroll from "../promotions/Scroll.svelte";
    import { pageListConfig } from "$lib/constants/pageListConfig";

    export let data;

    const { type, items } = data ?? {};

    const config = pageListConfig[type];

    let allItems = items || [];
    let filteredItems = [];

    const { update } = useServiceFilters(allItems, type, (result) => {
        filteredItems = result;
    });

    $: if (items) {
        allItems = items;
        update();
    }

    let lastScrollTop = 0;
    let infoVisible = false;
    let accumulatedDeltaDown = 0;
    let accumulatedDeltaUp = 0;

    onMount(() => {
        const contentEl = document.querySelector("main");
        if (contentEl) {
            contentEl.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (contentEl) {
                contentEl.removeEventListener("scroll", handleScroll);
            }
        };
    });

    function handleScroll(event) {
        const currentScroll = event.target.scrollTop;
        const delta = currentScroll - lastScrollTop;

        if (delta > 0) {
            accumulatedDeltaDown += delta;
            accumulatedDeltaUp = 0;
            if (accumulatedDeltaDown >= 10 && infoVisible) {
                infoVisible = false;
                accumulatedDeltaDown = 0;
            }
        } else if (delta < 0) {
            accumulatedDeltaUp += -delta;
            accumulatedDeltaDown = 0;
            if (accumulatedDeltaUp >= 150 && !infoVisible) {
                infoVisible = true;
                accumulatedDeltaUp = 0;
            }
        }

        lastScrollTop = currentScroll;
    }

    function resetAllFilters() {
        resetFilters();
    }
</script>

<PageSeoHead
    {type}
    locale={$localeStore}
    seo={config?.seoText?.[$localeStore] ?? config?.seoText?.en}
/>

<div class="content">
    <SidebarFilters
        {type}
        items={allItems}
        on:filtersChanged={(e) => {
            setFilters(e.detail);
            console.log("Filters changed:", e.detail);
        }}
    />
    <InfoBlock
        {infoVisible}
        filteredCount={filteredItems.length}
        onReset={resetAllFilters}
        {type}
    />
    <main>
        <div class="main_page">
            <h1 class="visually-hidden">
                {config?.seoText?.[$localeStore]?.title ??
                    config?.seoText?.en?.title}
            </h1>

            <div class="grid">
                {#each filteredItems as item, i (item.slug)}
                    {#if type === "places"}
                        <PlacesCard {item} loading={i < 5 ? "eager" : "lazy"} />
                    {:else}
                        <Card
                            {item}
                            loading={i < 5 ? "eager" : "lazy"}
                            {type}
                        />
                    {/if}
                {/each}
            </div>
        </div>
    </main>
</div>

<style>
    .content {
        position: relative;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        padding: 0px;
        gap: var(--space-vertical-xs);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-top: 1px solid var(--color-gray-500);
        border-bottom: 1px solid var(--color-gray-500);
    }

    .main_page {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
        width: 100%;
    }

    h1 {
        text-align: center;
        font-size: var(--text-xl);
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0;
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
</style>
