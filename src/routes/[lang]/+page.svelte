<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import ExcursionCard from "$lib/components/excursions/ExcursionCard.svelte";
    import { main_page } from "$lib/data/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import TheSidebar from "$lib/components/layout/TheSidebar.svelte";
    import { excursions } from "$lib/data/excursions";

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <div class="content">
        <TheSidebar />
        <main>
            <div class="main_page">
                <h1>
                    {@html main_page.title[$locale]}
                    {#if main_page.subtitle && main_page.subtitle[$locale]}
                        <p>{main_page.subtitle[$locale]}</p>
                    {/if}
                </h1>
                <section>
                    <div class="excursions-grid">
                        {#each excursions as excursion}
                            <ExcursionCard
                                slug={excursion.slug}
                                title={excursion.title}
                                description={excursion.description}
                                images={excursion.images}
                                duration={excursion.duration}
                                groupSize={excursion.groupSize}
                                price={excursion.price}
                                rating={excursion.rating}
                                reviews={excursion.reviews}
                                isPopular={excursion.isPopular}
                            />
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
