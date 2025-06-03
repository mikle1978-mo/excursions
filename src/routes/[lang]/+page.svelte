<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import ExcursionCard from "$lib/components/excursions/ExcursionCard.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import TheSidebar from "$lib/components/layout/TheSidebar.svelte";

    let isMounted = false;
    export let data;

    const { excursions: allExcursions } = data;
    let filteredExcursions = [...allExcursions];

    console.log(filteredExcursions);

    function handleFiltersChange(event) {
        const { durations, priceRange, groupSizes, minRating } = event.detail;

        filteredExcursions = allExcursions.filter((excursion) => {
            if (durations.length > 0 && !durations.includes(excursion.duration))
                return false;
            if (
                excursion.price < priceRange[0] ||
                excursion.price > priceRange[1]
            )
                return false;
            if (
                groupSizes.length > 0 &&
                !groupSizes.includes(excursion.groupSize)
            )
                return false;
            if (minRating > 0 && excursion.rating < minRating) return false;
            return true;
        });
    }

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <div class="content">
        <!-- <TheSidebar excursions={allExcursions} /> -->
        <TheSidebar
            excursions={allExcursions}
            on:filtersChanged={handleFiltersChange}
        />
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
                        {#each filteredExcursions as excursion}
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
