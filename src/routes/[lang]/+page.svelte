<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import ExcursionCard from "$lib/components/excursions/ExcursionCard.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import TheSidebar from "$lib/components/layout/TheSidebar.svelte";
    import { searchQuery } from "$lib/stores/searchQuery.js";
    import WhatsApp from "$lib/components/UI/buttons/WhatsApp.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";

    let search = "";
    let currentLocale = null;

    let allExcursions = [];
    let filteredExcursions = [];

    export let data;

    locale.subscribe((value) => {
        currentLocale = value;
        applyFilters();
    });

    searchQuery.subscribe((value) => {
        search = value.toLowerCase();
        applyFilters();
    });

    let currentFilters = {
        durations: [],
        priceRange: [0, Infinity],
        groupSizes: [],
        minRating: 0,
    };

    let updateKey = 0;
    let isMounted = false;

    $: if (data?.excursions) {
        allExcursions = data.excursions;
        filteredExcursions = [...allExcursions];
        applyFilters();
    }

    function applyFilters() {
        if (!allExcursions.length) return;

        filteredExcursions = allExcursions.filter((excursion) => {
            const excursionPriceUSD = excursion.price;

            const priceInRange =
                excursionPriceUSD >= currentFilters.priceRange[0] &&
                excursionPriceUSD <= currentFilters.priceRange[1];

            const durationMatch =
                currentFilters.durations.length === 0 ||
                currentFilters.durations.includes(excursion.duration);

            const groupSizeMatch =
                currentFilters.groupSizes.length === 0 ||
                currentFilters.groupSizes.includes(excursion.groupSize);

            const ratingMatch =
                currentFilters.minRating === 0 ||
                (excursion.rating !== null &&
                    excursion.rating >= currentFilters.minRating);

            const matchesSearch =
                !search ||
                excursion.title[currentLocale]?.toLowerCase().includes(search);

            return (
                priceInRange &&
                durationMatch &&
                groupSizeMatch &&
                ratingMatch &&
                matchesSearch
            );
        });
        updateKey++;
    }

    function handleFiltersChange(event) {
        currentFilters = event.detail;
        applyFilters();
    }

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <div class="content">
        <WhatsApp />
        <TheSidebar
            excursions={allExcursions}
            on:filtersChanged={handleFiltersChange}
        />
        <TheMobileMenu />
        <main>
            <div class="main_page">
                <h1 class="visually-hidden">
                    {@html main_page.title[$locale]}
                    {#if main_page.subtitle && main_page.subtitle[$locale]}
                        <p>{main_page.subtitle[$locale]}</p>
                    {/if}
                </h1>
                <section>
                    <div class="excursions-grid">
                        {#each filteredExcursions as excursion (excursion.slug + updateKey)}
                            <ExcursionCard {excursion} />
                        {/each}
                    </div>
                </section>
            </div>
        </main>
    </div>
{:else}
    <div></div>
{/if}

<style>
    .content {
        display: grid;
        grid-template-columns: 25% 1fr;
        align-items: flex-start;
        padding: 0px;
        gap: var(--space-vertical-md);
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

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--space-vertical-md) 0;
        width: 100%;
        transition: all 0.4s ease-in;
    }

    .excursions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }

    @media (max-width: 1024px) {
        .excursions-grid {
            grid-template-columns: repeat(auto-fill, 270px);
        }
    }

    @media (max-width: 768px) {
        .content {
            grid-template-columns: 1fr;
        }
        .main_page {
            gap: 2rem;
        }
    }

    @media (max-width: 480px) {
        .main_page {
            gap: var(--space-vertical-sm);
        }
        .excursions-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
