<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import CarCard from "$lib/components/cars/CarCard.svelte";
    import { main_page } from "$lib/i18n/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import CarsSidebar from "$lib/components/Cars/CarsSidebar.svelte";
    import { searchQuery } from "$lib/stores/searchQuery.js";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    let search = "";
    let currentLocale = null;

    let allCars = [];
    let filteredCars = [];

    export let data;

    console.log("====================================");
    console.log("Cars page data:", data);
    console.log("====================================");

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

    $: if (data?.cars) {
        allCars = data.cars;

        filteredCars = [...allCars];
        applyFilters();
    }

    function applyFilters() {
        if (!allCars.length) return;

        filteredCars = allCars.filter((car) => {
            if (!car.active) return false;
            const carPriceUSD = car.price;

            // Фильтр по цене
            const priceInRange = currentFilters.priceRange
                ? carPriceUSD >= currentFilters.priceRange[0] &&
                  carPriceUSD <= currentFilters.priceRange[1]
                : true;

            // Фильтр по длительности
            const durationMatch = currentFilters.durationRange
                ? car.duration >= currentFilters.durationRange[0] &&
                  car.duration <= currentFilters.durationRange[1]
                : true;

            // Фильтр по рейтингу
            const ratingMatch =
                currentFilters.minRating === 0 ||
                (car.rating !== null && car.rating >= currentFilters.minRating);

            // Поиск по названию
            const matchesSearch =
                !search ||
                car.title[currentLocale]?.toLowerCase().includes(search);

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
    <link rel="canonical" href={`${baseUrl}/${$locale}/cars`} />

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
        content={`${baseUrl}/images/cars/car_default.webp`}
    />
    <meta property="og:url" content={`${baseUrl}/${$locale}/cars`} />
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
        content={`${baseUrl}/images/cars/car_default.webp`}
    />
    {#each allCars.slice(0, 5) as item}
        {#if item.images && item.images.length > 0}
            <link
                rel="preload"
                as="image"
                href={item.images[0]}
                type="image/webp"
            />
        {/if}
    {/each}
</svelte:head>

<div class="content">
    <CarsSidebar cars={allCars} on:filtersChanged={handleFiltersChange} />

    <main>
        <div class="main_page">
            <h1 class="visually-hidden">
                {@html main_page.title[$locale]}
                {#if main_page.subtitle && main_page.subtitle[$locale]}
                    <p>{main_page.subtitle[$locale]}</p>
                {/if}
            </h1>

            <div class="cars-grid">
                {#each filteredCars as car, i (car.slug + updateKey)}
                    <CarCard {car} loading={i < 5 ? "eager" : "lazy"} />
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

    .cars-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }
</style>
