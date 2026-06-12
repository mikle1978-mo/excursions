<script>
    import { appConfig } from "$lib/config/app.config";
    import { filterState } from "$lib/stores/filterState";
    import { sidebarOpen } from "$lib/stores/sidebar.js";
    import { selectedCurrency } from "$lib/stores/currency.js";

    import PriceFilter from "$lib/components/filters/PriceFilter.svelte";
    import DurationFilter from "$lib/components/filters/DurationFilter.svelte";
    import RatingFilter from "$lib/components/filters/RatingFilter.svelte";

    import { onMount } from "svelte";

    export let type = "excursions";
    export let items = [];
    export let lang;

    export let rates;

    $: filtersConfig = appConfig.list[type].filters;
    $: state = $filterState;

    $: currentCurrency = $selectedCurrency;
    $: currentRate = currentCurrency || 1;

    const components = {
        price: PriceFilter,
        duration: DurationFilter,
        rating: RatingFilter,
    };

    function setFilter(key, value) {
        filterState.update((s) => ({
            ...s,
            [key]: value,
        }));
    }

    function getFilterKeys() {
        return Object.keys(filtersConfig).filter(
            (key) => filtersConfig[key]?.enabled,
        );
    }

    function resetAllFilters() {
        filterState.set({});
    }

    const closeSidebar = () => sidebarOpen.set(false);

    onMount(() => {
        filterState.set({});
    });
</script>

<svelte:window
    on:keydown={(e) => e.key === "Escape" && $sidebarOpen && closeSidebar()}
/>

{#if $sidebarOpen}
    <button
        class="sidebar-overlay"
        on:click={closeSidebar}
        aria-label="Закрыть фильтры"
    ></button>
{/if}

<side class="sidebar" class:active={$sidebarOpen}>
    <div class="sidebar-content">
        <span class="sidebar-title">Фильтры</span>
        <div class="filters">
            {#each getFilterKeys() as key}
                <svelte:component
                    this={components[key]}
                    {items}
                    {rates}
                    {lang}
                    value={state[key]}
                    on:change={(e) => setFilter(key, e.detail)}
                />
            {/each}
        </div>

        <div class="buttons">
            <button class="confirm-filters" on:click={closeSidebar}
                >Применить</button
            >
            <button class="reset-filters" on:click={resetAllFilters}
                >Сбросить</button
            >
        </div>
    </div>

    <button class="close-button" on:click={closeSidebar}>✕</button>
</side>

<style>
    /* Копируем твои стили как есть */
    .sidebar {
        height: 100%;
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        background-color: var(--color-bg);
        border-right: 1px solid var(--color-gray-300);
        overflow: hidden;
        top: 0;
        transition: var(--transition-normal);
        position: fixed;
        top: 0;
        left: -300px;
        width: 280px;
        height: 100svh;
        z-index: 1000;
        touch-action: pan-y;
    }

    .sidebar.active {
        transform: translateX(300px);
    }

    .sidebar-content {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
        flex-direction: column;
        gap: var(--space-vertical-md);
    }

    .sidebar-title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-primary);
    }
    .filters {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
        overflow-y: auto;
        max-height: calc(100svh - 200px);
    }

    .buttons {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }
    .confirm-filters,
    .reset-filters {
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        background: none;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-md);
        color: var(--color-gray-600);
        cursor: pointer;
        transition: var(--transition-fast);
        font-size: var(--text-sm);
    }

    .confirm-filters {
        border-color: var(--color-success);
        color: var(--color-success);
    }
    .confirm-filters:hover {
        border-color: var(--color-success);
        color: var(--color-success);
        background-color: rgba(208, 48, 47, 0.05);
    }
    .reset-filters:hover {
        border-color: var(--color-error);
        color: var(--color-error);
        background-color: rgba(208, 48, 47, 0.05);
    }

    .sidebar-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(var(--color-dark-rgb), 0.5);
        z-index: 999;
        backdrop-filter: blur(2px);
        transition: opacity 0.3s ease;
        cursor: pointer;
    }
    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        color: var(--color-gray-500);
        cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {
        .sidebar-overlay {
            background-color: rgba(var(--color-dark-rgb), 0.7);
        }
    }
</style>
