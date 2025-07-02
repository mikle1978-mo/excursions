<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import Card from "$lib/components/card/Card.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import YachtsSidebar from "$lib/components/yachts/YachtsSidebar.svelte";
    import { searchQuery } from "$lib/stores/searchQuery.js";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    let search = "";
    let currentLocale = null;

    let allYachts = [];
    let filteredYachts = [];

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
        durationRange: null, // изменено на null вместо []
        priceRange: null, // изменено на null вместо [0, Infinity]
        minRating: 0,
    };

    let updateKey = 0;
    let isMounted = false;

    $: if (data?.yachts) {
        allYachts = data.yachts;

        filteredYachts = [...allYachts];
        applyFilters();
    }

    function applyFilters() {
        if (!allYachts.length) return;

        filteredYachts = allYachts.filter((yacht) => {
            if (!yacht.active) return false;
            const excursionPriceUSD = yacht.price;

            // Фильтр по цене
            const priceInRange = currentFilters.priceRange
                ? excursionPriceUSD >= currentFilters.priceRange[0] &&
                  excursionPriceUSD <= currentFilters.priceRange[1]
                : true;

            // Фильтр по длительности
            const durationMatch = currentFilters.durationRange
                ? yacht.duration >= currentFilters.durationRange[0] &&
                  yacht.duration <= currentFilters.durationRange[1]
                : true;

            // Фильтр по рейтингу
            const ratingMatch =
                currentFilters.minRating === 0 ||
                (yacht.rating !== null &&
                    yacht.rating >= currentFilters.minRating);

            // Поиск по названию
            const matchesSearch =
                !search ||
                yacht.title[currentLocale]?.toLowerCase().includes(search);

            return (
                priceInRange && durationMatch && ratingMatch && matchesSearch
            );
        });
        updateKey++;
    }

    function handleFiltersChange(event) {
        currentFilters = {
            ...event.detail,
            // Обеспечиваем обратную совместимость
            durationRange: event.detail.durationRange?.length
                ? event.detail.durationRange
                : null,
            priceRange: event.detail.priceRange || null,
        };
        applyFilters();
    }

    onMount(() => {
        isMounted = true;
    });
    const SEO_TEXT = {
        ru: {
            title: "Аренда яхт и морские прогулки в Кемере",
            description:
                "Аренда яхт и прогулки по морю в Кемере. Частные туры, комфортабельные яхты, живописные бухты и прозрачное море.",
            keywords:
                "аренда яхты Кемер, морские прогулки Кемер, яхт туры, Кемер Турция, яхта на прокат, туры на яхте",
            twitter:
                "Аренда яхты в Кемере с капитаном. Уникальные морские прогулки и живописные маршруты.",
        },
        en: {
            title: "Yacht Rental and Sea Trips in Kemer",
            description:
                "Yacht rental and sea excursions in Kemer. Private tours, comfortable yachts, scenic bays and crystal-clear sea.",
            keywords:
                "yacht rental Kemer, sea trips Kemer, yacht tours, Kemer Turkey, private boat, yacht charter",
            twitter:
                "Charter a yacht in Kemer for unforgettable sea trips. Private routes and full comfort.",
        },
        tr: {
            title: "Kemer'de Yat Kiralama ve Deniz Turları",
            description:
                "Kemer'de yat kiralama ve deniz gezileri. Özel turlar, konforlu yatlar, berrak deniz ve eşsiz koylar.",
            keywords:
                "Kemer yat kiralama, deniz turu Kemer, yat turları, Kemer Türkiye, özel tekne, yat turu",
            twitter:
                "Kemer'de özel yat kiralama. Unutulmaz deniz gezileri ve konforlu rotalar sizi bekliyor.",
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
        content={`${baseUrl}/images/yachts/excursion_default.webp`}
    />
    {#each allYachts.slice(0, 5) as item}
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
    <!-- {#if isMounted} -->
    <YachtsSidebar
        excursions={allYachts}
        on:filtersChanged={handleFiltersChange}
    />
    <!-- {:else}
        <div></div>
    {/if} -->
    <main>
        <div class="main_page">
            <h1 class="visually-hidden">
                {main_page.title[$locale]}
            </h1>

            <div class="grid">
                {#each filteredYachts as yacht, i (yacht.slug + updateKey)}
                    <Card
                        item={yacht}
                        loading={i < 5 ? "eager" : "lazy"}
                        type="yachts"
                    />
                {/each}
            </div>
        </div>
    </main>
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
        padding: var(--space-vertical-md) 0;
    }

    h1 {
        text-align: center;
        font-size: var(--text-xl);
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }
</style>
