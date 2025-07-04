<script>
    import { page } from "$app/stores";
    import SeoSchemayacht from "$lib/components/SEO/SeoSchemaYacht.svelte";
    import { selectedCurrency } from "$lib/stores/currency.js";
    import { locale } from "$lib/stores/locale";
    import { onMount } from "svelte";
    import TheBreadcrumbs from "$lib/components/UI/breadcrumbs/TheBreadcrumbs.svelte";
    import { breadcrumbs } from "$lib/i18n/breadcrumbs.js";
    import { yacht_page } from "$lib/i18n/yacht_page.js";
    import { formatPrice } from "$lib/utils/priceFormatter.js";
    import { initCurrencyService } from "$lib/services/currencyService";
    import Galery from "$lib/components/layout/Galery.svelte";
    import ReviewsList from "$lib/components/layout/ReviewsList.svelte";
    import Modal from "$lib/components/UI/Modal.svelte";
    import ShortForm from "$lib/components/UI/forms/shortForm.svelte";
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import Rating from "$lib/components/UI/rating/Rating.svelte";
    import InfoBlockArray from "$lib/components/pages/InfoBlockArray.svelte";
    import InfoBlockString from "$lib/components/pages/InfoBlockString.svelte";
    import ProductSeoHead from "$lib/components/SEO/ProductSeoHead.svelte";

    export let data;
    const { yacht, reviewsCount, rating } = data;

    const { slug } = $page.params;
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

<ProductSeoHead
    {baseUrl}
    {baseName}
    urlPath="yachts"
    slug={yacht.slug}
    title={currentTranslation.title}
    description={currentTranslation.metaDescription}
    keywords={currentTranslation.metaDescription
        .split(/\s+/)
        .map((word) => word.replace(/[.,!?;:()]/g, "").toLowerCase())
        .filter(
            (word, index, arr) => word.length > 2 && arr.indexOf(word) === index
        )
        .join(", ")}
    image={yacht.images?.[0]?.url ||
        `${baseUrl}/images/yachts/yacht_default.webp`}
    imageAlt={`Photo ${currentTranslation.title}`}
    amount={yacht.price.toString()}
    currency="USD"
    availability={yacht.active ? "in stock" : "out of stock"}
    brand=""
/>

<SeoSchemayacht
    title={currentTranslation.title}
    description={currentTranslation.metaDescription}
    image={yacht.images?.[0].url || "/images/yachts/yacht_default.webp"}
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
                <Rating {rating} {reviewsCount} locale={$locale} />

                <div class="badges">
                    {#if yacht.isPopular}
                        <span class="badge popular">Популярно</span>
                    {/if}
                    <span class="badge duration"
                        >{yacht.duration} {yacht_page.hours[$locale]}</span
                    >
                </div>
            </div>
        </header>

        <!-- Галерея изображений -->
        <Galery images={yacht.images} title={yacht.title} />

        <!-- Основное содержимое -->
        <div class="content-grid">
            <section class="description">
                <h2>{yacht_page.description[$locale]}</h2>
                <p>{currentTranslation.description}</p>
            </section>

            <aside class="booking-card">
                <div class="price-block">
                    <span class="price">{$priceDisplay}</span>
                    <span class="per-person">
                        {yacht_page.perPerson[$locale]}</span
                    >
                </div>

                <div class="details">
                    <div class="detail">
                        <span class="label"
                            >{yacht_page.duration[$locale]}:</span
                        >
                        <span class="value"
                            >{yacht.duration}
                            {yacht_page.hours[$locale]}</span
                        >
                    </div>

                    <div class="detail">
                        <span class="label">
                            {yacht_page.groupSize[$locale]}:</span
                        >
                        <span class="value"
                            >{yacht_page.before[$locale]}
                            {yacht.groupSize}
                            {yacht_page.people[$locale]}</span
                        >
                    </div>
                </div>

                <button
                    class="book-button"
                    on:click={yacht.active ? openModal : null}
                    disabled={!yacht.active}
                    style="background-color: {yacht.active
                        ? 'var(--color-primary)'
                        : '#ccc'}; cursor: {yacht.active
                        ? 'pointer'
                        : 'not-allowed'}"
                >
                    {yacht.active
                        ? yacht_page.button[$locale]
                        : yacht_page.available[$locale]}
                </button>
                <Share />
            </aside>
            <section class="additional-info">
                <!-- Что включено -->
                <InfoBlockArray
                    title={yacht_page.includes[$locale]}
                    items={currentTranslation.includes}
                />
                <!-- Что вы увидите -->
                <InfoBlockArray
                    title={yacht_page.whatYouSee[$locale]}
                    items={currentTranslation.whatYouSee}
                />

                <!-- Что взять с собой -->
                <InfoBlockArray
                    title={yacht_page.whatToBring[$locale]}
                    items={currentTranslation.whatToBring}
                />
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

    @media (prefers-color-scheme: dark) {
        .description {
            p {
                color: var(--color-gray-300);
            }
        }
    }

    /* Блок бронирования */
    .booking-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-vertical-md);
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
        width: 100%;
        gap: var(--space-vertical-sm);

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
</style>
