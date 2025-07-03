<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import Card from "$lib/components/card/Card.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount, onDestroy } from "svelte";
    import SidebarFilters from "$lib/components/filters/SidebarFilters.svelte";
    import {
        resetFilters,
        setFilters,
        hasFilter,
    } from "$lib/stores/filters.js";
    import SortControls from "$lib/components/filters/SortControls.svelte";
    import PageSEO from "$lib/components/SEO/PageSEO.svelte";
    import { useServiceFilters } from "$lib/hooks/useServiceFilters.js";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let data;

    let allExcursions = data?.excursions || [];
    let filteredExcursions = [];

    // Scroll info block visibility
    let lastScrollTop = 0;
    let infoVisible = false;
    let accumulatedDeltaDown = 0;
    let accumulatedDeltaUp = 0;

    // Используем хук для фильтров поиска и сортировки
    const { update } = useServiceFilters(
        allExcursions,
        "excursions",
        (result) => {
            filteredExcursions = result;
        }
    );

    // Следим за обновлением данных
    $: if (data?.excursions) {
        allExcursions = data.excursions;
        update();
    }

    // Scroll logic
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

    // SEO
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

    // Обработчики
    function resetAllFilters() {
        resetFilters();
    }
</script>

<PageSEO
    {baseUrl}
    {baseName}
    locale={$locale}
    urlPath="excursions"
    seo={SEO_TEXT[$locale] ?? SEO_TEXT.en}
    image={`${baseUrl}/images/excursions/excursion_default.webp`}
/>

<div class="content">
    <SidebarFilters
        type="excursions"
        items={allExcursions}
        on:filtersChanged={(e) => setFilters(e.detail)}
    />

    <main>
        <div class="info-block" class:hidden={infoVisible}>
            <div class="filter-container">
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
        position: absolute;
        bottom: -1px;
        z-index: 1;
        opacity: 0.9;
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }

    .hidden {
        opacity: 0; /* или 0 */
        transform: translateY(100%);
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
        padding: var(--space-vertical-md) 0;
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
