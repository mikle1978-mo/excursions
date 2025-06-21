<script>
    import { page } from "$app/stores";
    import SeoSchemayacht from "$lib/components/SEO/SeoSchemaYacht.svelte";
    import { selectedCurrency } from "$lib/stores/currency.js";
    import { locale } from "$lib/stores/locale";
    import { onMount } from "svelte";
    import TheBreadcrumbs from "$lib/components/UI/breadcrumbs/TheBreadcrumbs.svelte";
    import { breadcrumbs } from "$lib/i18n/breadcrumbs.js";
    export let data;
    const { yacht, reviewsCount, rating } = data;

    console.log("Yacht data:", yacht);

    const { slug } = $page.params;
    import { excursion_page } from "$lib/i18n/excursion_pade.js";
    import { formatPrice } from "$lib/utils/priceFormatter.js";
    import { initCurrencyService } from "$lib/services/currencyService";
    import Galery from "$lib/components/layout/Galery.svelte";
    import ReviewsList from "$lib/components/layout/ReviewsList.svelte";
    import Modal from "$lib/components/UI/Modal.svelte";
    import ShortForm from "$lib/components/UI/forms/shortForm.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
    let lang = $page.params.lang || "en";

    let isModalOpen = false;

    const openModal = () => {
        isModalOpen = true;
    };

    const closeModal = () => {
        isModalOpen = false;
    };

    let isMounted = false;
    $: currentTranslation =
        yacht.translations.find((t) => t.lang === $locale) ?? {};

    $: breadcrumbsList = [
        { href: `/`, label: breadcrumbs.home[$locale] },
        { href: `/${$locale}/yachts`, label: breadcrumbs.yachts[$locale] },
        yacht ? { label: currentTranslation.title } : { label: "..." },
    ];
    let priceDisplay;
    onMount(async () => {
        await initCurrencyService();
        priceDisplay = formatPrice(yacht.price);
        isMounted = true;
    });
</script>

<svelte:head>
    <title>{`${currentTranslation.title} | ${baseName}`}</title>
    <meta name="description" content={currentTranslation.metaDescription} />
    <meta name="keywords" content={currentTranslation.title} />

    <!-- Open Graph (у тебя уже есть основные) -->
    <meta property="og:title" content={currentTranslation.title} />
    <meta
        property="og:description"
        content={currentTranslation.metaDescription}
    />
    <meta property="og:image" content={yacht.images[0]} />
    <meta
        property="og:image:alt"
        content={`Tuor photo: ${currentTranslation.title}`}
    />
    <meta property="og:type" content="product" />
    <meta property="og:url" content={`${baseUrl}${$page.url.pathname}`} />
    <meta property="og:locale" content={lang} />
    <meta property="og:site_name" content={baseName} />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={currentTranslation.title} />
    <meta
        name="twitter:description"
        content={currentTranslation.metaDescription}
    />
    <meta name="twitter:image" content={yacht.images[0]} />
    <!-- <meta name="twitter:site" content="@YourTwitterHandle" /> -->

    <!-- Канонический URL -->
    <link rel="canonical" href={`${baseUrl}${$page.url.pathname}`} />
</svelte:head>

<SeoSchemayacht
    title={currentTranslation.title}
    description={currentTranslation.metaDescription}
    image={yacht.images?.[0] || "/images/excursions/excursion_default.webp"}
    url={`${baseUrl}${$page.url.pathname}`}
    price={yacht.price}
    currency="USD"
    {rating}
    reviewCount={reviewsCount}
    language={lang}
/>

{#if isModalOpen}
    <Modal on:close={closeModal}>
        <ShortForm slug={yacht.slug} />
    </Modal>
{/if}

{#if !yacht}
    <div class="error-page">
        <h1>Экскурсия не найдена</h1>
        <a href="/{$locale}/excursions">← Вернуться к списку экскурсий</a>
    </div>
{:else}
    <article class="excursion-detail">
        <!-- Хлебные крошки -->
        <TheBreadcrumbs items={breadcrumbsList} />

        <!-- Заголовок и мета-информация -->
        <header class="excursion-header">
            <h1>{currentTranslation.title}</h1>

            <div class="meta-info">
                <div class="rating">
                    <span class="stars" style="--rating: {rating || 0}"></span>
                    <span>{rating}</span>
                    <span
                        >({reviewsCount || 0}
                        {excursion_page.reviews[$locale]})</span
                    >
                </div>

                <div class="badges">
                    {#if yacht.isPopular}
                        <span class="badge popular">Популярно</span>
                    {/if}
                    <span class="badge duration"
                        >{yacht.duration} {excursion_page.hours[$locale]}</span
                    >
                </div>
            </div>
        </header>

        <!-- Галерея изображений -->
        <Galery images={yacht.images} title={yacht.title} />

        <!-- Основное содержимое -->
        <div class="content-grid">
            <section class="description">
                <h2>{excursion_page.description[$locale]}</h2>
                <p>{currentTranslation.description}</p>
            </section>

            <aside class="booking-card">
                <div class="price-block">
                    <span class="price">{$priceDisplay}</span>
                    <span class="per-person">
                        {excursion_page.perPerson[$locale]}</span
                    >
                </div>

                <div class="details">
                    <div class="detail">
                        <span class="label"
                            >{excursion_page.duration[$locale]}:</span
                        >
                        <span class="value"
                            >{yacht.duration}
                            {excursion_page.hours[$locale]}</span
                        >
                    </div>

                    <div class="detail">
                        <span class="label">
                            {excursion_page.groupSize[$locale]}:</span
                        >
                        <span class="value"
                            >{excursion_page.before[$locale]}
                            {yacht.groupSize}
                            {excursion_page.people[$locale]}</span
                        >
                    </div>
                </div>

                <button class="book-button" on:click={openModal}
                    >{excursion_page.button[$locale]}</button
                >
            </aside>
            <section class="additional-info">
                <!-- Что включено -->
                {#if currentTranslation.includes.length > 0}
                    <div class="info-block">
                        <h2>{excursion_page.includes[$locale]}</h2>
                        <ul class="info-list">
                            {#each currentTranslation.includes as item}
                                <li>{item}</li>
                            {/each}
                        </ul>
                    </div>
                {/if}
                <!-- Что вы увидите -->
                {#if currentTranslation.whatYouSee.length > 0}
                    <div class="info-block">
                        <h2>{excursion_page.whatYouSee[$locale]}</h2>
                        <ul class="info-list">
                            {#each currentTranslation.whatYouSee as item}
                                <li>{item}</li>
                            {/each}
                        </ul>
                    </div>
                {/if}

                <!-- Что взять с собой -->
                {#if currentTranslation.whatToBring.length > 0}
                    <div class="info-block">
                        <h2>{excursion_page.whatToBring[$locale]}</h2>
                        <ul class="info-list">
                            {#each currentTranslation.whatToBring as item}
                                <li>{item}</li>
                            {/each}
                        </ul>
                    </div>
                {/if}
            </section>
        </div>

        <ReviewsList itemSlug={yacht.slug} />
    </article>
{/if}

<style>
    /* Базовые стили страницы */
    .excursion-detail {
        display: flex;
        flex-direction: column;
        max-width: var(--max-width-container);
        margin: 0 auto;
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

    /* Шапка экскурсии */
    .excursion-header {
        h1 {
            font-size: var(--text-xxl);
            margin-bottom: var(--space-vertical-sm);
            color: var(--color-text);
        }
    }

    .meta-info {
        display: flex;
        gap: var(--space-horizontal-md);
        align-items: center;
        flex-wrap: wrap;
    }

    .rating {
        display: flex;
        align-items: сenter;
        gap: var(--space-horizontal-xs);
    }
    .stars {
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;
        font-size: var(--text-lg);
        line-height: 1;
    }
    .stars::before {
        content: "★★★★★";
        background: linear-gradient(
            90deg,
            gold var(--percent),
            lightgray var(--percent)
        );
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .badges {
        display: flex;
        gap: var(--space-horizontal-xs);
    }

    .badge {
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        border-radius: var(--radius-sm);
        font-size: var(--text-xs);
        font-weight: 600;

        &.popular {
            background: var(--color-accent);
            color: var(--color-light);
        }

        &.duration {
            background: var(--color-primary);
            color: var(--color-text);
        }
    }

    /* Основной контент */
    .content-grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: var(--space-horizontal-lg);

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .description {
        h2 {
            font-size: var(--text-xl);
            margin-bottom: var(--space-vertical-sm);
            color: var(--color-text);
        }

        p {
            line-height: var(--line-height-base);
            color: var(--color-gray-700);
        }
    }

    /* Блок бронирования */
    .booking-card {
        background: var(--color-bg);
        padding: var(--space-vertical-md);
        border-radius: var(--radius-md);
        align-self: start;
        position: sticky;
        top: var(--space-vertical-md);

        @media (max-width: 768px) {
            position: static;
        }
    }

    .price-block {
        margin-bottom: var(--space-vertical-md);
        text-align: center;

        .price {
            font-size: var(--text-xxl);
            font-weight: 700;
            color: var(--color-primary);
            display: block;
        }

        .per-person {
            font-size: var(--text-sm);
            color: var(--color-gray-600);
        }
    }

    .details {
        display: grid;
        gap: var(--space-vertical-sm);
        margin-bottom: var(--space-vertical-md);

        .detail {
            display: flex;
            justify-content: space-between;

            .label {
                color: var(--color-gray-600);
            }

            .value {
                font-weight: 500;
            }
        }
    }

    .book-button {
        width: 100%;
        padding: var(--space-vertical-sm);
        background: var(--color-primary);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);

        &:hover {
            background: var(--color-primary-hover);
        }
    }

    /* Страница ошибки */
    .error-page {
        text-align: center;
        padding: var(--space-vertical-xl) var(--space-horizontal-md);

        a {
            color: var(--color-primary);
            display: inline-block;
            margin-top: var(--space-vertical-sm);
        }
    }

    .additional-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-lg);
    }

    .info-block {
        background: var(--color-bg);
        padding: var(--space-vertical-md);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-gray-300);
    }

    .info-block h2 {
        font-size: var(--text-lg);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }

    .info-list {
        list-style: disc inside;
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
    }
</style>
