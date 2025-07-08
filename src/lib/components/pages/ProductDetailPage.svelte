<script>
    import { onMount } from "svelte";
    import {
        locale as localeStore,
        getLocalizedPath,
    } from "$lib/stores/locale";
    import TheBreadcrumbs from "$lib/components/UI/breadcrumbs/TheBreadcrumbs.svelte";
    import ReviewsList from "../layout/ReviewsList.svelte";
    import BookingCard from "./BookingCard.svelte";
    import ProductDetailsBlock from "./ProductDetailsBlock.svelte";
    import Galery from "$lib/components/layout/Galery.svelte";
    import Rating from "$lib/components/UI/rating/Rating.svelte";
    import ProductSeoHead from "$lib/components/SEO/ProductSeoHead.svelte";
    import Modal from "$lib/components/UI/Modal.svelte";
    import ShortForm from "$lib/components/UI/forms/shortForm.svelte";
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import InfoBlockArray from "$lib/components/pages/InfoBlockArray.svelte";
    import InfoBlockString from "$lib/components/pages/InfoBlockString.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    export let type;
    export let item;
    export let rating;
    export let reviewsCount;
    export let locale;
    export let translations;

    export function getI18nLabel(obj, key, locale) {
        return obj?.[key]?.[locale] ?? key;
    }

    $: effectiveLocale = locale ?? $localeStore;

    let isModalOpen = false;
    const openModal = () => (isModalOpen = true);
    const closeModal = () => (isModalOpen = false);

    $: currentTranslation =
        item?.translations?.find((t) => t.lang === effectiveLocale) ?? {};

    // Хлебные крошки
    const typeLabels = {
        car: { ru: "Авто", en: "Cars", tr: "Araba" },
        excursion: { ru: "Экскурсии", en: "Excursions", tr: "Turlar" },
        yacht: { ru: "Яхты", en: "Yachts", tr: "Yatlar" },
        transfer: { ru: "Трансферы", en: "Transfers", tr: "Transferler" },
    };

    $: breadcrumbsList = [
        {
            label: effectiveLocale === "ru" ? "Главная" : "Home",
            href: getLocalizedPath(effectiveLocale, ""),
        },
        {
            label: typeLabels[type]?.[effectiveLocale] ?? type,
            href: getLocalizedPath(effectiveLocale, `${type}s`),
        },
        {
            label: currentTranslation?.title || item?.slug,
            href: null,
        },
    ];
</script>

<ProductSeoHead
    {baseUrl}
    {baseName}
    urlPath={`${type}s`}
    slug={item.slug}
    title={currentTranslation.title}
    description={currentTranslation.metaDescription}
    keywords={currentTranslation.metaKeywords}
    image={item.images?.[0]?.url ??
        `${baseUrl}/images/${type}s/${type}s_default.webp`}
    imageAlt={`Photo ${currentTranslation.title}`}
    amount={item.price?.toString() ?? "0"}
    currency="USD"
    availability={item.active ? "in stock" : "out of stock"}
    brand={item.brand ?? ""}
    locale={$localeStore}
/>

{#if isModalOpen}
    <Modal on:close={closeModal}>
        <ShortForm slug={item.slug} />
    </Modal>
{/if}

{#if !item}
    <div class="error-page">
        <h1>
            {effectiveLocale === "ru" ? "Объект не найден" : "Item not found"}
        </h1>
        <a href={`/${effectiveLocale}/${type}s`}>
            ← {effectiveLocale === "ru" ? "Вернуться к списку" : "Back to list"}
        </a>
    </div>
{:else}
    <article class="product-detail">
        <TheBreadcrumbs items={breadcrumbsList} />

        <header class="header">
            <h1>{currentTranslation.title}</h1>
            <div class="meta-info">
                <Rating {rating} {reviewsCount} locale={effectiveLocale} />
                {#if item.isPopular}
                    <span class="badge popular">
                        {effectiveLocale === "ru" ? "Популярно" : "Popular"}
                    </span>
                {/if}
            </div>
        </header>

        <Galery images={item.images} title={currentTranslation.title} />

        <section class="description">
            <h2>{effectiveLocale === "ru" ? "Описание" : "Description"}</h2>
            <p>{currentTranslation.description}</p>
        </section>

        <BookingCard
            price={item.price}
            priceType={item.priceType}
            active={item.active}
            locale={effectiveLocale}
            onBook={openModal}
        />
        <ProductDetailsBlock {type} {item} {locale} />

        <!-- Общие мультиязычные блоки -->
        <section class="additional-info">
            {#if currentTranslation.requiredDocuments}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "requiredDocuments",
                        effectiveLocale
                    )}
                    items={currentTranslation.requiredDocuments}
                />
            {/if}

            {#if currentTranslation.insuranceDescription}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "insuranceDescription",
                        effectiveLocale
                    )}
                    items={currentTranslation.insuranceDescription}
                />
            {/if}

            {#if currentTranslation.insuranceExclusions}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "insuranceExclusions",
                        effectiveLocale
                    )}
                    items={currentTranslation.insuranceExclusions}
                />
            {/if}

            {#if currentTranslation.extraTimePolicy}
                <InfoBlockString
                    title={getI18nLabel(
                        translations,
                        "extraTimePolicy",
                        effectiveLocale
                    )}
                    item={currentTranslation.extraTimePolicy}
                />
            {/if}

            {#if currentTranslation.fuelPolicy}
                <InfoBlockString
                    title={getI18nLabel(
                        translations,
                        "fuelPolicy",
                        effectiveLocale
                    )}
                    item={currentTranslation.fuelPolicy}
                />
            {/if}

            {#if currentTranslation.accidentInstructions}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "accidentInstructions",
                        effectiveLocale
                    )}
                    items={currentTranslation.accidentInstructions}
                />
            {/if}
            {#if currentTranslation.whatYouSee}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "whatYouSee",
                        effectiveLocale
                    )}
                    items={currentTranslation.whatYouSee}
                />
            {/if}

            {#if currentTranslation.whatToBring}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "whatToBring",
                        effectiveLocale
                    )}
                    items={currentTranslation.whatToBring}
                />
            {/if}

            {#if currentTranslation.includes}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "includes",
                        effectiveLocale
                    )}
                    items={currentTranslation.includes}
                />
            {/if}

            {#if currentTranslation.rentalConditions}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "rentalConditions",
                        effectiveLocale
                    )}
                    items={currentTranslation.rentalConditions}
                />
            {/if}

            {#if currentTranslation.servicesDetails}
                <InfoBlockArray
                    title={getI18nLabel(
                        translations,
                        "servicesDetails",
                        effectiveLocale
                    )}
                    items={currentTranslation.servicesDetails}
                />
            {/if}

            {#if currentTranslation.meetingPoint}
                <InfoBlockString
                    title={getI18nLabel(
                        translations,
                        "meetingPoint",
                        effectiveLocale
                    )}
                    item={currentTranslation.meetingPoint}
                />
            {/if}

            {#if currentTranslation.notes}
                <InfoBlockArray
                    title={getI18nLabel(translations, "notes", effectiveLocale)}
                    items={currentTranslation.notes}
                />
            {/if}

            {#if item.slug}
                <ReviewsList itemSlug={item.slug} locale={effectiveLocale} />
            {/if}
        </section>
    </article>
{/if}

<style>
    /* Стили из твоего кода с переименованными классами */
    .product-detail {
        display: flex;
        flex-direction: column;
        max-width: var(--max-width-container);
        margin: 0 auto;
        padding: 0;
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

    .header h1 {
        font-size: var(--text-xxl);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }

    .meta-info {
        display: flex;
        gap: var(--space-horizontal-md);
        align-items: center;
        flex-wrap: wrap;
    }

    .badge {
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        border-radius: var(--radius-sm);
        font-size: var(--text-xs);
        font-weight: 600;
    }
    .badge.popular {
        background: var(--color-accent);
        color: var(--color-light);
    }

    .description h2 {
        font-size: var(--text-xl);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }

    .description p {
        line-height: var(--line-height-base);
        color: var(--color-gray-700);
    }

    @media (prefers-color-scheme: dark) {
        .description p {
            color: var(--color-gray-300);
        }
    }

    .error-page {
        text-align: center;
        padding: var(--space-vertical-xl) var(--space-horizontal-md);
    }

    .error-page a {
        color: var(--color-primary);
        display: inline-block;
        margin-top: var(--space-vertical-sm);
    }

    .additional-info {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-lg);
    }
</style>
