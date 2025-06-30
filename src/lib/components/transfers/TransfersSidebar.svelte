<script>
    import { locale } from "$lib/stores/locale.js";
    import { sidebarOpen } from "$lib/stores/sidebar";
    import { selectedCurrency, exchangeRates } from "$lib/stores/currency";

    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    import PriceFilter from "$lib/components/filters/PriceFilter.svelte";
    import DurationFilter from "$lib/components/filters/DurationFilter.svelte";
    import RatingFilter from "$lib/components/filters/RatingFilter.svelte";

    export let transfers;
    let initialized = false;

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

    // Фильтры
    let filters = {
        durationRange: null,
        priceRange: null,
        minRating: 0,
    };

    // Валюта и курс
    $: currentCurrency = $selectedCurrency;
    $: currentRate = $exchangeRates[currentCurrency] || 1;

    // Данные для фильтров
    $: durations = [...new Set(transfers.map((e) => e.duration))].sort(
        (a, b) => a - b
    );
    $: maxPriceUSD = Math.max(...transfers.map((e) => e.priceUSD || e.price));
    $: displayMaxPrice = maxPriceUSD * currentRate;
    $: displayPriceRange = filters.priceRange
        ? filters.priceRange.map((p) => p * currentRate)
        : [0, convertToCurrent(maxPriceUSD)];

    function handlePriceChange(e) {
        filters.priceRange = e.detail.map((p) => p / currentRate);
        dispatchFilters();
    }

    function handleDurationChange(e) {
        filters.durationRange = e.detail.length ? e.detail : null;
        dispatchFilters();
    }

    function handleRatingChange(e) {
        filters.minRating = e.detail;
        dispatchFilters();
    }

    function dispatchFilters() {
        dispatch("filtersChanged", filters);
    }

    const setRating = (rating) => {
        filters = { ...filters, minRating: rating };
        dispatch("filtersChanged", { ...filters });
    };

    // Функции конвертации
    function convertToCurrent(priceUSD) {
        return priceUSD * currentRate;
    }

    function convertToUSD(priceInCurrent) {
        return priceInCurrent / currentRate;
    }

    const resetFilters = () => {
        filters = {
            durationRange: null,
            priceRange: null,
            minRating: 0,
        };
        displayPriceRange = [0, convertToCurrent(maxPriceUSD)];
        dispatch("filtersChanged", { ...filters });
    };

    onMount(() => {
        filters = {
            durationRange: null,
            priceRange: null,
            minRating: 0,
        };
        displayPriceRange = [0, convertToCurrent(maxPriceUSD)];
        dispatch("filtersChanged", {
            durationRange: null,
            priceRange: [0, maxPriceUSD],
            minRating: 0,
        });
        initialized = true;
    });

    const closeSidebar = () => sidebarOpen.set(false);
    const handleKeydown = (e) =>
        e.key === "Escape" && $sidebarOpen && closeSidebar();
    const handleBackdropClick = () => closeSidebar();
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
        <span class="sidebar-title">{labels.title[$locale]}</span>
        <div class="filters">
            <PriceFilter
                currency={currentCurrency}
                maxPrice={displayMaxPrice}
                currentRange={displayPriceRange}
                on:change={handlePriceChange}
            />

            <RatingFilter
                minRating={filters.minRating}
                on:change={handleRatingChange}
            />

            <DurationFilter
                {durations}
                currentRange={filters.durationRange || [
                    Math.min(...durations),
                    Math.max(...durations),
                ]}
                on:change={handleDurationChange}
            />
        </div>

        <!-- Кнопки -->
        <div class="buttons">
            <button class="confirm-filters" on:click={closeSidebar}>
                {labels.apply[$locale]}
            </button>
            <button class="reset-filters" on:click={resetFilters}>
                {labels.reset[$locale]}
            </button>
        </div>
    </div>

    <button class="close-button" on:click={closeSidebar}>✕</button>
</side>

<style>
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
        max-height: calc(
            100svh - 200px
        ); /* Учитываем высоту заголовка и кнопок */
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
