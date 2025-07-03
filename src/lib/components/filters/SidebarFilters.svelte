<script>
    import { locale } from "$lib/stores/locale.js";
    import { sidebarOpen } from "$lib/stores/sidebar";
    import { selectedCurrency, exchangeRates } from "$lib/stores/currency";
    import { createEventDispatcher, onMount } from "svelte";

    import PriceFilter from "$lib/components/filters/PriceFilter.svelte";
    import DurationFilter from "$lib/components/filters/DurationFilter.svelte";
    import RatingFilter from "$lib/components/filters/RatingFilter.svelte";

    export let type = "excursions";
    export let items = [];
    export let filters = {
        priceRange: null,
        durationRange: null,
        minRating: 0,
    };

    const titles = {
        excursions: { en: "Excursion Filters", ru: "Фильтры экскурсий" },
        cars: { en: "Car Filters", ru: "Фильтры машин" },
        yachts: { en: "Yacht Filters", ru: "Фильтры яхт" },
    };

    const labels = {
        title: {
            en: "Excursion Filters",
            ru: "Фильтры экскурсий",
        },
        apply: {
            en: "Apply",
            ru: "Применить",
        },
        reset: {
            en: "Reset",
            ru: "Сбросить",
        },
    };

    const dispatch = createEventDispatcher();

    // Локальная копия фильтров
    let localFilters = { ...filters };

    // Когда filters проп обновляется - обновляем localFilters
    $: if (filters) {
        localFilters = { ...filters };
    }

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

    // Обработчики обновляют локальный filters и эмитят событие
    function handlePriceChange(e) {
        localFilters.priceRange = e.detail.map((p) => p / currentRate);
        dispatch("filtersChanged", { ...localFilters });
    }

    function handleDurationChange(e) {
        localFilters.durationRange = e.detail.length ? e.detail : null;
        dispatch("filtersChanged", { ...localFilters });
    }

    function handleRatingChange(e) {
        localFilters.minRating = e.detail;
        dispatch("filtersChanged", { ...localFilters });
    }

    function resetFilters() {
        localFilters = {
            priceRange: null,
            durationRange: null,
            minRating: 0,
        };
        dispatch("filtersChanged", { ...localFilters });
    }

    const closeSidebar = () => sidebarOpen.set(false);
    const handleKeydown = (e) =>
        e.key === "Escape" && $sidebarOpen && closeSidebar();
    const handleBackdropClick = () => closeSidebar();

    onMount(() => {
        resetFilters();
    });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $sidebarOpen}
    <div
        class="sidebar-overlay"
        role="presentation"
        on:click={handleBackdropClick}
        on:keydown={(e) => e.key === "Enter" && closeSidebar()}
    ></div>
{/if}

<side class="sidebar" class:active={$sidebarOpen}>
    <div class="sidebar-content">
        <span class="sidebar-title">{titles[type]?.[$locale] || "Filters"}</span
        >

        <div class="filters">
            {#if priceRange[0] !== priceRange[1]}
                <PriceFilter
                    currency={currentCurrency}
                    minPrice={priceRange[0] * currentRate}
                    maxPrice={priceRange[1] * currentRate}
                    currentRange={localFilters.priceRange
                        ? localFilters.priceRange.map((p) => p * currentRate)
                        : [0, priceRange[1] * currentRate]}
                    on:change={handlePriceChange}
                />
            {/if}

            {#if type === "excursions" && durationRange}
                <DurationFilter
                    durations={durationRange}
                    currentRange={localFilters.durationRange || durationRange}
                    on:change={handleDurationChange}
                />
            {/if}

            <RatingFilter
                minRating={localFilters.minRating || 0}
                on:change={handleRatingChange}
            />
        </div>

        <div class="buttons">
            <button class="confirm-filters" on:click={closeSidebar}>
                {labels?.apply?.[$locale] || "Apply"}
            </button>
            <button class="reset-filters" on:click={resetFilters}>
                {labels?.reset?.[$locale] || "Reset"}
            </button>
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
