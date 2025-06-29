<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { yacht_card } from "$lib/i18n/yacht_card";
    import { formatPrice } from "$lib/utils/priceFormatter";
    import Rating from "../UI/rating/Rating.svelte";
    export let yacht;
    export let loading = "lazy";

    const {
        slug = "/",
        title = "Обзорная экскурсия по историческому центру",
        images = [{ url: "/images/excursions/excursion_default.webp" }],
        duration = 2.5,
        groupSize = 10,
        price = 1500,
        discount = 0,
        rating = 4,
        reviewsCount = 142,
        meta = {},
    } = yacht;

    let isMounted = false;
    const priceDisplay = formatPrice(price);

    function getLabelByKey(labelsArray, key) {
        return labelsArray.find((item) => item.key === key);
    }

    onMount(async () => {
        isMounted = true;
    });
</script>

<!-- {#if isMounted} -->
<a class="excursion-card" href="/{$locale}/yachts/{slug}">
    <div class="excursion-card__image-wrapper">
        <img
            src={images[0]?.url}
            alt=""
            class="excursion-card__image"
            width="980"
            height="551"
            {loading}
            fetchpriority={loading === "eager" ? "high" : "auto"}
        />

        {#if getLabelByKey(meta.labels, "POPULAR")}
            <span class="excursion-card__badge topright">
                {getLabelByKey(meta.labels, "POPULAR").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "DISCOUNT")}
            <span class="excursion-card__badge bottomleft">
                {`-${discount}%`}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "NEW")}
            <span class="excursion-card__badge topleft">
                {getLabelByKey(meta.labels, "NEW").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "VIP")}
            <span class="excursion-card__badge bottomright">
                {getLabelByKey(meta.labels, "VIP").label[$locale]}
            </span>
        {/if}
    </div>

    <div class="excursion-card__content">
        <div class="excursion-card__header">
            <h2 class="excursion-card__title">{title[$locale]}</h2>
            <Rating {rating} {reviewsCount} locale={$locale} />
        </div>

        <div class="excursion-card__footer">
            <div class="excursion-card__details">
                <span class="excursion-card__duration"
                    >{duration} {yacht_card.hours[$locale]}</span
                >
                <span class="excursion-card__group-size"
                    >{yacht_card.before[$locale]}
                    {groupSize}
                    {yacht_card.people[$locale]}</span
                >
            </div>

            <div class="excursion-card__price">
                <span class="excursion-card__price-value">
                    {$priceDisplay}
                </span>
                <span class="excursion-card__price-per">
                    {yacht_card.per[yacht.priceType]?.[$locale] ?? ""}
                </span>
            </div>
        </div>
    </div>
</a>

<style>
    .excursion-card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        transition: var(--transition-normal);
        height: 100%;
        min-height: 245px;
    }

    .excursion-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .excursion-card__image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
    }

    .excursion-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .excursion-card__badge {
        position: absolute;
        color: var(--color-light);
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        border-radius: var(--radius-sm);
        font-size: var(--text-xs);
        font-weight: 600;
    }

    .topleft {
        top: var(--space-vertical-xs);
        left: var(--space-horizontal-xs);
        background-color: var(--color-error);
    }
    .topright {
        top: var(--space-vertical-xs);
        right: var(--space-horizontal-xs);
        background-color: var(--color-accent);
    }
    .bottomleft {
        bottom: var(--space-vertical-xs);
        left: var(--space-horizontal-xs);
        background-color: var(--color-primary);
    }
    .bottomright {
        bottom: var(--space-vertical-xs);
        right: var(--space-horizontal-xs);
        background-color: var(--color-secondary);
    }
    .excursion-card__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        flex-grow: 1;
    }

    .excursion-card__header {
        display: flex;
        flex-direction: column;
    }

    .excursion-card__title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);

        white-space: nowrap; /* Не переносить текст */
        overflow: hidden; /* Скрыть выходящий за пределы текст */
        text-overflow: ellipsis;
    }

    .excursion-card__footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .excursion-card__details {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xxs);
    }

    .excursion-card__duration,
    .excursion-card__group-size {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    .excursion-card__price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .excursion-card__price-value {
        font-size: var(--text-lg);
        font-weight: 500;
        color: var(--color-primary);
    }

    .excursion-card__price-per {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    @media (max-width: 768px) {
        .excursion-card {
            flex-direction: column;
        }
        .excursion-card__content {
            display: flex;
            flex-direction: column;
            gap: var(--space-vertical-xs);
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
            flex-grow: 1;
        }
    }
</style>
