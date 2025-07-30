<script>
    import { main_page } from "$lib/i18n/main_page";
    import { locale } from "$lib/stores/locale";
    import MainCard from "$lib/components/cards/MainCard.svelte";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { fly, slide } from "svelte/transition";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    $: canonicalUrl = `${baseUrl}`;

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
        keywords: {
            ru: "отдых, кемере, экскурсии, аренда, яхт, автомобилей, трансферы, комфортного, бизнеса, турции",
            en: "kemer, vacation, comfortable, excursions, yacht, car, rentals, transfers, stay, everything",
        },
    };
</script>

<svelte:head>
    <title>{SEO.title[$locale]}</title>
    <meta name="description" content={SEO.description[$locale]} />
    <meta name="keywords" content={SEO.keywords[$locale]} />
    <link rel="canonical" href={canonicalUrl} />

    <!-- hreflang -->
    <link rel="alternate" hreflang="ru" href={`${baseUrl}/ru`} />
    <link rel="alternate" hreflang="en" href={`${baseUrl}`} />
    <link rel="alternate" hreflang="x-default" href={`${baseUrl}`} />

    <!-- Open Graph (OG) -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={baseName} />
    <meta property="og:title" content={SEO.title[$locale]} />
    <meta property="og:description" content={SEO.description[$locale]} />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:locale" content={$locale} />
    <meta
        property="og:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />
    <meta property="og:image:alt" content={SEO.title[$locale]} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={SEO.title[$locale]} />
    <meta name="twitter:description" content={SEO.description[$locale]} />
    <meta
        name="twitter:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />

    <!-- preload first 3 images -->
    {#each main_page.pages.slice(0, 3) as item}
        <link rel="preload" as="image" href={item.img} type="image/webp" />
    {/each}
</svelte:head>

<div class="content">
    <main>
        <div class="main_page">
            <h1>
                {main_page.title[$locale]}
            </h1>

            <div class="grid">
                {#each main_page.pages as item, i}
                    <MainCard {item} loading={i < 3 ? "eager" : "lazy"} />
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
            grid-template-columns: 1fr;
        }
    }

    /* 768+ — 2 колонки (можешь оставить 2, если не хочешь мельчить) */
    @media (min-width: 768px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* 992+ — 3 колонки */
    @media (min-width: 992px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* 1200+ — 4 колонки */
    @media (min-width: 1200px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    /* 1440+ — 5 колонок (или оставь 4, если плотность не нравится) */
    @media (min-width: 1440px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
</style>
