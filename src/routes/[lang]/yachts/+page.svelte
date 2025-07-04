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
    import PageSeo from "$lib/components/SEO/PageSeo.svelte";
    import { useServiceFilters } from "$lib/hooks/useServiceFilters.js";
    import InfoBlock from "$lib/components/layout/InfoBlock.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let data;

    let allYachts = data?.yachts || [];
    let filteredYachts = [];

    // Scroll info block visibility
    let lastScrollTop = 0;
    let infoVisible = false;
    let accumulatedDeltaDown = 0;
    let accumulatedDeltaUp = 0;

    // Используем хук для фильтров поиска и сортировки
    const { update } = useServiceFilters(allYachts, "yachts", (result) => {
        filteredYachts = result;
    });

    // Следим за обновлением данных
    $: if (data?.yachts) {
        allYachts = data.yachts;
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

    function resetAllFilters() {
        resetFilters();
    }
</script>

<PageSeo
    {baseUrl}
    {baseName}
    locale={$locale}
    urlPath="yachts"
    seo={SEO_TEXT[$locale] ?? SEO_TEXT.en}
    image={`${baseUrl}/images/yachts/yacht_default.webp`}
/>

<div class="content">
    <SidebarFilters
        type="yachts"
        items={allYachts}
        on:filtersChanged={(e) => setFilters(e.detail)}
    />
    <main>
        <InfoBlock
            {infoVisible}
            filteredCount={filteredYachts.length}
            onReset={resetAllFilters}
            type="yachts"
        />
        <div class="main_page">
            <h1 class="visually-hidden">
                {main_page.title[$locale]}
            </h1>

            <div class="grid">
                {#each filteredYachts as yacht, i (yacht.slug)}
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
