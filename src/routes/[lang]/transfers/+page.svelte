<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import TransferCard from "$lib/components/transfers/TransferCard.svelte";
    import Card from "$lib/components/card/Card.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import TransfersSidebar from "$lib/components/transfers/TransfersSidebar.svelte";
    import { searchQuery } from "$lib/stores/searchQuery.js";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    let search = "";
    let currentLocale = null;

    let allTransfers = [];
    let filteredTransfers = [];

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

    $: if (data?.transfers) {
        allTransfers = data.transfers;

        filteredTransfers = [...allTransfers];
        applyFilters();
    }

    function applyFilters() {
        if (!allTransfers.length) return;

        filteredTransfers = allTransfers.filter((transfer) => {
            if (!transfer.active) return false;
            const transferPriceUSD = transfer.price;

            // Фильтр по цене
            const priceInRange = currentFilters.priceRange
                ? transferPriceUSD >= currentFilters.priceRange[0] &&
                  transferPriceUSD <= currentFilters.priceRange[1]
                : true;

            // Фильтр по длительности
            const durationMatch = currentFilters.durationRange
                ? transfer.duration >= currentFilters.durationRange[0] &&
                  transfer.duration <= currentFilters.durationRange[1]
                : true;

            // Фильтр по рейтингу
            const ratingMatch =
                currentFilters.minRating === 0 ||
                (transfer.rating !== null &&
                    transfer.rating >= currentFilters.minRating);

            // Поиск по названию
            const matchesSearch =
                !search ||
                transfer.title[currentLocale]?.toLowerCase().includes(search);

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
            title: "Экскурсии по Турции",
            description:
                "Увлекательные экскурсии по Турции. Гиды, трансфер, комфорт и уникальные маршруты.",
            keywords: "экскурсии в Турции, туры, гиды, отдых, Стамбул, Анталия",
            twitter:
                "Экскурсии по Турции от местных гидов. Онлайн бронирование.",
        },
        en: {
            title: "Transfers in Turkey",
            description:
                "Exciting tours around Turkey. Guides, transfer, comfort and unique routes.",
            keywords:
                "transfers in Turkey, tours, guides, vacation, Istanbul, Antalya",
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
    <link rel="canonical" href={`${baseUrl}/${$locale}/transfers`} />

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
        content={`${baseUrl}/images/transfers/transfer_default.webp`}
    />
    <meta property="og:url" content={`${baseUrl}/${$locale}/transfers`} />
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
        content={`${baseUrl}/images/transfers/transfer_default.webp`}
    />
    {#each allTransfers.slice(0, 5) as item}
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
    <TransfersSidebar
        transfers={allTransfers}
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

            <div class="transfers-grid">
                {#each filteredTransfers as transfer, i (transfer.slug + updateKey)}
                    <Card
                        item={transfer}
                        loading={i < 5 ? "eager" : "lazy"}
                        type="transfers"
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

    .transfers-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }
</style>
