<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import Card from "$lib/components/card/Card.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount, onDestroy } from "svelte";
    import SidebarFilters from "$lib/components/filters/SidebarFilters.svelte";
    import { searchQuery } from "$lib/stores/searchQuery.js";
    import {
        resetFilters,
        setFilters,
        hasFilter,
    } from "$lib/stores/filters.js";
    import PageSeoHead from "$lib/components/SEO/PageSeoHead.svelte";
    import { useServiceFilters } from "$lib/hooks/useServiceFilters.js";
    import InfoBlock from "$lib/components/layout/InfoBlock.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    export let data;

    let allCars = data?.cars || [];
    let filteredCars = [];

    // Scroll info block visibility
    let lastScrollTop = 0;
    let infoVisible = false;
    let accumulatedDeltaDown = 0;
    let accumulatedDeltaUp = 0;

    // Используем хук для фильтров поиска и сортировки
    const { update } = useServiceFilters(allCars, "cars", (result) => {
        filteredCars = result;
    });

    // Следим за обновлением данных
    $: if (data?.cars) {
        allCars = data.cars;
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

    const SEO_TEXT = {
        ru: {
            title: "Аренда автомобилей в Кемере",
            description:
                "Прокат авто в Кемере и окрестностях. Комфортные автомобили, выгодные цены и быстрая подача.",
            keywords:
                "аренда авто Кемер, прокат машин Турция, аренда автомобилей Анталия, авто напрокат Кемер",
            twitter:
                "Аренда авто в Кемере — удобно, быстро и без залога. Онлайн бронирование.",
        },
        en: {
            title: "Car Rental in Kemer",
            description:
                "Rent a car in Kemer and nearby areas. Reliable vehicles, great prices, and fast service.",
            keywords:
                "car rental Kemer, rent a car Turkey, car hire Antalya, car rental near me",
            twitter:
                "Car rental in Kemer — fast, affordable, and hassle-free. Book online now.",
        },
        tr: {
            title: "Kemer'de Araç Kiralama",
            description:
                "Kemer ve çevresinde uygun fiyatlarla konforlu araç kiralama hizmeti.",
            keywords:
                "Kemer araç kiralama, Antalya rent a car, Türkiye'de araba kiralama, uygun fiyatlı araç kiralama",
            twitter:
                "Kemer'de araç kiralama — hızlı, güvenilir ve uygun fiyatlı. Hemen çevrimiçi rezervasyon yapın.",
        },
    };

    // Обработчики
    function resetAllFilters() {
        resetFilters();
    }
</script>

<PageSeoHead
    {baseUrl}
    {baseName}
    locale={$locale}
    urlPath="cars"
    seo={SEO_TEXT[$locale] ?? SEO_TEXT.en}
    image={`${baseUrl}/images/cars/car_default.webp`}
/>

<div class="content">
    <SidebarFilters
        type="cars"
        items={allCars}
        on:filtersChanged={(e) => setFilters(e.detail)}
    />

    <main>
        <InfoBlock
            {infoVisible}
            filteredCount={filteredCars.length}
            onReset={resetAllFilters}
            type="cars"
        />
        <div class="main_page">
            <h1 class="visually-hidden">
                {main_page.title[$locale]}
            </h1>

            <div class="grid">
                {#each filteredCars as car, i (car.slug)}
                    <!-- <CarCard {car} loading={i < 5 ? "eager" : "lazy"} /> -->
                    <Card
                        item={car}
                        loading={i < 5 ? "eager" : "lazy"}
                        type="cars"
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
