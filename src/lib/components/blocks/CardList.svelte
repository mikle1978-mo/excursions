<script>
    import Card from "$lib/components/cards/Card.svelte";
    import PlacesCard from "../cards/PlacesCard.svelte";
    import BlogsCard from "../cards/BlogsCard.svelte";
    import SidebarFilters from "$lib/components/filters/SidebarFilters.svelte";
    import PageSeoHead from "$lib/components/SEO/PageSeoHead.svelte";
    import EventSeoSchema from "../SEO/EventSeoSchema.svelte";
    import InfoBlock from "$lib/components/layout/InfoBlock.svelte";
    import { useServiceFilters } from "$lib/hooks/useServiceFilters.js";
    import { resetFilters, setFilters } from "$lib/stores/filters.js";
    import { onMount } from "svelte";
    import Scroll from "../promotions/Scroll.svelte";
    import { pageListConfig } from "$lib/config/pageListConfig";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    export let data;

    const { type, items, lang } = data ?? {};
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
    {baseUrl}
    {baseName}
    urlPath={type}
    slug=""
    title={config.seoText?.[lang]?.title ?? config.seoText?.en?.title}
    description={config.seoText?.[lang]?.description ??
        config.seoText?.en?.description}
    keywords={config.seoText?.[lang]?.keywords ?? ""}
    image={`${baseUrl}/images/${type}/${config.defaultImage}`}
    imageAlt={`Banner for ${type}`}
    locale={lang}
/>
{#if type === "excursions"}
    {#each filteredItems as item}
        <EventSeoSchema {item} locale={lang} />
    {/each}
{/if}

<div class="content">
    {#if type !== "blogs" && type !== "places"}
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
    {/if}

    <main>
        <div class="main_page">
            <h1>
                {config?.seoText?.[lang]?.h1 ?? config?.seoText?.en?.h1}
            </h1>

            <div class="description-block">
                {@html config?.seoText?.[lang]?.topText ??
                    config?.seoText?.en?.topText}
            </div>

            <div class="grid">
                {#each filteredItems as item, i (item.slug)}
                    {#if type === "places"}
                        <PlacesCard {item} loading={i < 5 ? "eager" : "lazy"} />
                    {:else if type === "blogs"}
                        <BlogsCard
                            {item}
                            {type}
                            loading={i < 5 ? "eager" : "lazy"}
                        />
                    {:else}
                        <Card
                            {item}
                            loading={i < 5 ? "eager" : "lazy"}
                            {type}
                        />
                    {/if}
                {/each}
            </div>

            <div class="description-block">
                {@html config?.seoText?.[lang]?.bottomText ??
                    config?.seoText?.en?.bottomText}
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
        margin-top: var(--space-vertical-xs);
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
