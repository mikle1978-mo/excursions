<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import ExcursionCard from "$lib/components/excursions/ExcursionCard.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import TheSidebar from "$lib/components/excursions/TheSidebar.svelte";
    import { searchQuery } from "$lib/stores/searchQuery.js";
    import { page } from "$app/stores";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    let lang = $page.params.lang;

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
        durationRange: null, // изменено на null вместо []
        priceRange: null, // изменено на null вместо [0, Infinity]
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

            // Фильтр по цене
            const priceInRange = currentFilters.priceRange
                ? excursionPriceUSD >= currentFilters.priceRange[0] &&
                  excursionPriceUSD <= currentFilters.priceRange[1]
                : true;

            // Фильтр по длительности
            const durationMatch = currentFilters.durationRange
                ? excursion.duration >= currentFilters.durationRange[0] &&
                  excursion.duration <= currentFilters.durationRange[1]
                : true;

            // Фильтр по рейтингу
            const ratingMatch =
                currentFilters.minRating === 0 ||
                (excursion.rating !== null &&
                    excursion.rating >= currentFilters.minRating);

            // Поиск по названию
            const matchesSearch =
                !search ||
                excursion.title[currentLocale]?.toLowerCase().includes(search);

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
    <title>{SEO_TEXT[lang]?.title ?? SEO_TEXT.en.title} | {baseName}</title>
    <meta
        name="description"
        content={SEO_TEXT[lang]?.description ?? SEO_TEXT.en.description}
    />
    <meta
        name="keywords"
        content={SEO_TEXT[lang]?.keywords ?? SEO_TEXT.en.keywords}
    />
    <link rel="canonical" href={`${baseUrl}/${lang}`} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={baseName} />
    <meta
        property="og:title"
        content={SEO_TEXT[lang]?.title ?? SEO_TEXT.en.title}
    />
    <meta
        property="og:description"
        content={SEO_TEXT[lang]?.description ?? SEO_TEXT.en.description}
    />
    <meta
        property="og:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />
    <meta property="og:url" content={`${baseUrl}/${lang}`} />
    <meta property="og:locale" content={lang} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content={SEO_TEXT[lang]?.title ?? SEO_TEXT.en.title}
    />
    <meta
        name="twitter:description"
        content={SEO_TEXT[lang]?.twitter ?? SEO_TEXT.en.twitter}
    />
    <meta
        name="twitter:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />
</svelte:head>

{#if isMounted}
    <div class="content">
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
        display: flex;
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
