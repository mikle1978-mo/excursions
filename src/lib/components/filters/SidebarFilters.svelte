<script>
    import { filters } from "$lib/stores/filters.js";
    import { sidebarOpen } from "$lib/stores/sidebar.js";
    import { selectedCurrency, exchangeRates } from "$lib/stores/currency.js";
    import { createEventDispatcher } from "svelte";

    import PriceFilter from "$lib/components/filters/PriceFilter.svelte";
    import DurationFilter from "$lib/components/filters/DurationFilter.svelte";
    import RatingFilter from "$lib/components/filters/RatingFilter.svelte";

    import { get } from "svelte/store";

    export let type = "excursions";
    export let items = [];

    const dispatch = createEventDispatcher();

    // Валюта
    $: currentCurrency = $selectedCurrency;
    $: currentRate = $exchangeRates[currentCurrency] || 1;

    // Диапазоны
    $: priceRange = computePriceRange();
    $: durationRange = computeDurationRange();

    function computePriceRange() {
        if (!items.length) return [0, 0];
        const prices = items.map((i) => i.priceUSD || i.price || 0);
        return [Math.min(...prices), Math.max(...prices)];
    }

    function computeDurationRange() {
        if (type !== "excursions" || !items.length) return null;
        const durations = items.map((i) => i.duration || 0);
        return [Math.min(...durations), Math.max(...durations)];
    }

    // Обновления фильтров
    function handlePriceChange(e) {
        filters.update((f) => ({
            ...f,
            priceRange: e.detail.map((p) => p / currentRate),
        }));
    }
    function handleDurationChange(e) {
        filters.update((f) => ({ ...f, durationRange: e.detail }));
    }
    function handleRatingChange(e) {
        filters.update((f) => ({ ...f, minRating: e.detail }));
    }
    function resetAllFilters() {
        filters.set({
            priceRange: null,
            durationRange: null,
            minRating: 0,
            sort: null,
        });
    }

    const closeSidebar = () => sidebarOpen.set(false);
    const handleKeydown = (e) =>
        e.key === "Escape" && $sidebarOpen && closeSidebar();
    const handleBackdropClick = () => closeSidebar();
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $sidebarOpen}
    <button
        class="sidebar-overlay"
        on:click={handleBackdropClick}
        area-label="close">✕</button
    >
{/if}

<side class="sidebar" class:active={$sidebarOpen}>
    <div class="sidebar-content">
        <span class="sidebar-title">Фильтры</span>
        <div class="filters">
            {#if priceRange[0] !== priceRange[1]}
                <PriceFilter
                    currency={currentCurrency}
                    minPrice={priceRange[0] * currentRate}
                    maxPrice={priceRange[1] * currentRate}
                    currentRange={$filters.priceRange
                        ? $filters.priceRange.map((p) => p * currentRate)
                        : [
                              priceRange[0] * currentRate,
                              priceRange[1] * currentRate,
                          ]}
                    on:change={handlePriceChange}
                />
            {/if}

            {#if type === "excursions" && durationRange}
                <DurationFilter
                    durations={durationRange}
                    currentRange={$filters.durationRange || durationRange}
                    on:change={handleDurationChange}
                />
            {/if}

            <RatingFilter
                minRating={$filters.minRating}
                on:change={handleRatingChange}
            />
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
        color: var(--color-text);
        cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {
        .sidebar-overlay {
            background-color: rgba(var(--color-dark-rgb), 0.7);
        }
    }
</style>
