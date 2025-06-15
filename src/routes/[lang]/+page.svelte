<script>
    import { main_page } from "$lib/i18n/main_page";
    import { locale } from "$lib/stores/locale";
    import MainCard from "$lib/components/main/MainCard.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { fly, slide } from "svelte/transition";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    $: canonicalUrl = `${baseUrl}/${$locale}`;
    $: {
        console.log("Текущая локаль:", canonicalUrl);
    }

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });

    const SEO = {
        title: {
            ru: "Отдых в Кемере — экскурсии, аренда яхт и авто, трансфер",
            en: "Kemer Vacation — Tours, Yacht & Car Rentals, Transfers",
        },
        description: {
            ru: "Все для комфортного отдыха в Кемере: экскурсии, аренда яхт и автомобилей, трансферы.",
            en: "Everything for a comfortable stay in Kemer: excursions, yacht and car rentals, and transfers.",
        },
    };
</script>

<svelte:head>
    <title>{SEO.title[$locale]}</title>
    <meta name="description" content={SEO.description[$locale]} />
    <link rel="canonical" href={canonicalUrl} />

    <!-- hreflang -->
    <link rel="alternate" hreflang="ru" href={`${baseUrl}/ru`} />
    <link rel="alternate" hreflang="en" href={`${baseUrl}/en`} />
    <link rel="alternate" hreflang="x-default" href={`${baseUrl}/en`} />
</svelte:head>

<div class="content">
    <div class="main_page">
        <h1>
            {@html main_page.title[$locale]}
        </h1>
        {#if isMounted}
            <div class="main-grid">
                {#each main_page.pages as item}
                    <MainCard {item} />
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .content {
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
    .main_page {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
        width: 100%;
    }

    .main-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }
    h1 {
        font-size: var(--text-xxl);
    }
</style>
