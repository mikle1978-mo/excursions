<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import Card from "$lib/components/card/Card.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    // import EcxursionsSidebar from "$lib/components/excursions/EcxursionsSidebar.svelte";
    import SidebarFilters from "$lib/components/filters/SidebarFilters.svelte";
    import { searchQuery } from "$lib/stores/searchQuery.js";
    import {
        filters,
        hasFilter,
        resetFilters,
        setFilters,
    } from "$lib/stores/filters.js";
    import { onDestroy } from "svelte";
    import { get } from "svelte/store";
    import { sortStore } from "$lib/stores/sortStore.js";
    import SortControls from "$lib/components/filters/SortControls.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let data;

    let priceRange = [0, 0];
    let durationRange = [0, 0];

    let search = "";
    let currentLocale = null;

    let allExcursions = [];
    let filteredExcursions = [];

    let selectedSort = null;

    let lastScrollTop = 0;
    let infoVisible = true; // управляет видимостью
    let scrollY = 0;

    // Подписываемся на сторы
    const unsubscribeSort = sortStore.subscribe((value) => {
        selectedSort = value;
        applyFilters(); // или отдельный applySort, если хочешь разделить
    });

    const unsubscribeLocale = locale.subscribe((v) => {
        currentLocale = v;
        applyFilters();
    });

    const unsubscribeSearch = searchQuery.subscribe((v) => {
        search = v.toLowerCase();
        applyFilters();
    });

    const unsubscribeFilters = filters.subscribe(($filters) => {
        applyFilters($filters);
    });

    onDestroy(() => {
        unsubscribeLocale();
        unsubscribeSearch();
        unsubscribeFilters();
    });

    let isMounted = false;

    $: if (data?.excursions) {
        allExcursions = data.excursions;

        filteredExcursions = [...allExcursions];
        applyFilters();
    }

    function applyFilters() {
        const $filters = get(filters);
        filteredExcursions = allExcursions.filter((excursion) => {
            if (!excursion.active) return false;

            // Price filter
            const priceMatch = $filters.priceRange
                ? excursion.price >= $filters.priceRange[0] &&
                  excursion.price <= $filters.priceRange[1]
                : true;

            // Duration filter
            const durationMatch = $filters.durationRange
                ? excursion.duration >= $filters.durationRange[0] &&
                  excursion.duration <= $filters.durationRange[1]
                : true;

            // Rating filter
            const ratingMatch =
                $filters.minRating === 0 ||
                (excursion.rating !== null &&
                    excursion.rating >= $filters.minRating);

            // Search filter
            const matchesSearch =
                !search ||
                excursion.title[currentLocale]?.toLowerCase().includes(search);

            return priceMatch && durationMatch && ratingMatch && matchesSearch;
        });

        // Sorting
        switch (selectedSort) {
            case "priceAsc":
                filteredExcursions.sort(
                    (a, b) => (a.price || 0) - (b.price || 0)
                );
                break;
            case "priceDesc":
                filteredExcursions.sort(
                    (a, b) => (b.price || 0) - (a.price || 0)
                );
                break;
            case "ratingDesc":
                filteredExcursions.sort(
                    (a, b) => (b.rating || 0) - (a.rating || 0)
                );
                break;
            case "durationAsc":
                filteredExcursions.sort(
                    (a, b) => (a.duration || 0) - (b.duration || 0)
                );
                break;
        }
    }
    // Изменение фильтров
    function handleFiltersChange(event) {
        setFilters(event.detail);
    }
    // Изменение сортировки
    function handleSortChange(e) {
        sortStore.set(e.target.value);
    }
    // Сброс фильтров
    function resetAllFilters() {
        resetFilters();
    }
    // Сброс сортировки
    function resetSort() {
        sortStore.set(null);
    }

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
        const contentEl = event.target;
        const currentScroll = contentEl.scrollTop;
        if (currentScroll > lastScrollTop) {
            infoVisible = false;
        } else {
            infoVisible = true;
        }
        lastScrollTop = currentScroll;
    }

    const SEO_TEXT = {
        ru: {
            title: "Экскурсии по Турции",
            description:
                "Увлекательные экскурсии по Турции. Гиды, трансфер, комфорт и уникальные маршруты.",
            keywords: "экскурсии в Турции, туры, гиды, отдых, Стамбул, Анталия",
            twitter:
                "Экскурсии по Турции от местных гидов. Онлайн бронирование.",
        },
        en: {
            title: "Excursions in Turkey",
            description:
                "Exciting tours around Turkey. Guides, transfer, comfort and unique routes.",
            keywords:
                "excursions in Turkey, tours, guides, vacation, Istanbul, Antalya",
            twitter: "Tours in Turkey with local guides. Book online now.",
        },
        tr: {
            title: "Türkiye'de Turlar",
            description:
                "Türkiye'de heyecan verici turlar. Rehberler, transfer, konfor ve eşsiz rotalar.",
            keywords: "Türkiye'de turlar, rehberler, tatil, İstanbul, Antalya",
            twitter:
                "Yerel rehberlerle Türkiye'de turlar. Hemen çevrimiçi rezervasyon yapin.",
        },
    };
</script>

<svelte:head>
    <title>{SEO_TEXT[$locale]?.title ?? SEO_TEXT.en.title} | {baseName}</title>
    <meta
        name="description"
        content={SEO_TEXT[$locale]?.description ?? SEO_TEXT.en.description}
    />
    <meta
        name="keywords"
        content={SEO_TEXT[$locale]?.keywords ?? SEO_TEXT.en.keywords}
    />
    <link rel="canonical" href={`${baseUrl}/${$locale}/excursions`} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={baseName} />
    <meta
        property="og:title"
        content={SEO_TEXT[$locale]?.title ?? SEO_TEXT.en.title}
    />
    <meta
        property="og:description"
        content={SEO_TEXT[$locale]?.description ?? SEO_TEXT.en.description}
    />
    <meta
        property="og:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />
    <meta property="og:url" content={`${baseUrl}/${$locale}/excursions`} />
    <meta property="og:locale" content={$locale} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content={SEO_TEXT[$locale]?.title ?? SEO_TEXT.en.title}
    />
    <meta
        name="twitter:description"
        content={SEO_TEXT[$locale]?.twitter ?? SEO_TEXT.en.twitter}
    />
    <meta
        name="twitter:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />
    {#each allExcursions.slice(0, 5) as item}
        {#if item.images && item.images.length > 0}
            <link
                rel="preload"
                as="image"
                href={item.images[0]?.url}
                type="image/webp"
            />
        {/if}
    {/each}
</svelte:head>

<div class="content">
    <SidebarFilters
        type="excursions"
        items={allExcursions}
        {filters}
        on:filtersChanged={(e) => setFilters(e.detail)}
    />
    <main>
        <div class="info-block" class:hidden={!infoVisible}>
            <div class="fitler-containet">
                {#if $hasFilter}
                    <button
                        class="filters-info-button"
                        on:click={resetAllFilters}
                        aria-label="Сбросить фильтры"
                        title="Сбросить фильтры"
                    >
                        {#if $locale === "ru"}
                            Выбрано {filteredExcursions.length}
                        {:else}
                            Filtered {filteredExcursions.length} items
                        {/if}

                        <!-- Крестик в SVG (можно заменить на символ или иконку из библиотеки) -->
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path
                                d="M18 6 L6 18 M6 6 L18 18"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                            />
                        </svg>
                    </button>
                {/if}
            </div>

            <SortControls />
        </div>

        <div class="main_page">
            <h1 class="visually-hidden">
                {@html main_page.title[$locale]}
                {#if main_page.subtitle && main_page.subtitle[$locale]}
                    <p>{main_page.subtitle[$locale]}</p>
                {/if}
            </h1>

            <div class="grid">
                {#each filteredExcursions as excursion, i (excursion.slug)}
                    <Card
                        item={excursion}
                        loading={i < 5 ? "eager" : "lazy"}
                        type="excursions"
                    />
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
        padding: 0px;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-top: 1px solid var(--color-gray-500);
        border-bottom: 1px solid var(--color-gray-500);
    }

    .info-block {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-vertical-md);
        background-color: var(--color-bg);
        width: 100%;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: -1px;
        z-index: 1;
        opacity: 1;
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }

    .hidden {
        opacity: 0.5; /* или 0 */
        transform: translateY(-100%);
        pointer-events: none;
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }

    .filters-info-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.8rem;
        background-color: var(--color-bg, #f0f0f0);
        border: 1px solid var(--color-gray-400, #ccc);
        border-radius: var(--radius-md, 6px);
        color: var(--color-text, #333);
        font-size: var(--text-xs, 0.875rem);
        white-space: nowrap;

        cursor: pointer;
        user-select: none;
        transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
    }

    .filters-info-button:hover,
    .filters-info-button:focus {
        background-color: var(--color-primary, #4ac97e);
        border-color: var(--color-primary-hover, #3db16d);
        color: white;
        outline: none;
    }

    .filters-info-button svg {
        width: 1rem;
        height: 1rem;
        fill: currentColor;
        flex-shrink: 0;
    }

    .main_page {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
        width: 100%;
        padding: 0 0 var(--space-vertical-md) 0;
    }

    h1 {
        text-align: center;
        font-size: var(--text-xl);
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }

    /* 414+ — 1 колонка (карточка красиво помещается) */
    @media (min-width: 414px) {
        .grid {
            grid-template-columns: 1fr;
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
            grid-template-columns: 1fr 1fr 1fr;
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
