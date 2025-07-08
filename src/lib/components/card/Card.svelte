<script>
    import { locale, getLocalizedPath } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { card } from "$lib/i18n/card";
    import { formatPrice } from "$lib/utils/priceFormatter";
    import Rating from "../UI/rating/Rating.svelte";

    export let item;
    export let type;

    export let loading = "lazy";
    $: slug = item.slug;
    $: title = item.title?.[$locale] ?? "";
    $: image = item.images?.[0]?.url ?? `/images/${type}/${type}_default.webp`;
    $: priceDisplay = formatPrice(item.price);
    $: priceType =
        item.priceType && card[item.priceType] ? item.priceType : "per_person";

    $: priceTypeLabel = card[priceType]?.[$locale] ?? "";

    $: discount = item.discount ?? 0;

    $: fuelLabel = item.fuel ? (card[item.fuel]?.[$locale] ?? item.fuel) : "";
    $: transmissionLabel = item.transmission
        ? (card[item.transmission]?.[$locale] ?? item.transmission)
        : "";
    $: detailTop = item.duration
        ? `${item.duration} ${type === "transfers" ? card.minutes[$locale] : card.hours[$locale]}`
        : (transmissionLabel ?? "");
    $: detailBottom =
        type === "transfers"
            ? `${card.before[$locale]} ${item.car.seats} ${card.people[$locale]}`
            : item.groupSize
              ? `${card.before[$locale]} ${item.groupSize} ${card.people[$locale]}`
              : (fuelLabel ?? "");
    $: rating = item.rating ?? 5;
    $: reviewsCount = item.reviewsCount ?? 10;
    $: meta = item.meta ?? {};

    let isMounted = false;

    function getLabelByKey(labelsArray, key) {
        return labelsArray.find((item) => item.key === key);
    }

    onMount(async () => {
        isMounted = true;
    });
</script>

<a class="card" href={getLocalizedPath($locale, `${type}/${slug}`)}>
    <div class="card__image-wrapper">
        <img
            src={image}
            alt={title}
            class="card__image"
            width="980"
            height="551"
            {loading}
            fetchpriority={loading === "eager" ? "high" : "auto"}
        />

        {#if getLabelByKey(meta.labels, "POPULAR")}
            <span class="card__badge topright">
                {getLabelByKey(meta.labels, "POPULAR").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "DISCOUNT")}
            <span class="card__badge bottomleft">
                {`-${discount}%`}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "NEW")}
            <span class="card__badge topleft">
                {getLabelByKey(meta.labels, "NEW").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "VIP")}
            <span class="card__badge bottomright">
                {getLabelByKey(meta.labels, "VIP").label[$locale]}
            </span>
        {/if}
    </div>

    <div class="card__content">
        <div class="card__header">
            <h2 class="card__title">{title}</h2>
            <Rating {rating} {reviewsCount} locale={$locale} />
        </div>

        <div class="card__footer">
            <div class="card__details">
                <span class="card__detail-top">{detailTop} </span>
                <span class="card__detail-bottom">
                    {detailBottom}
                </span>
            </div>

            <div class="card__price">
                <span class="card__price-value">
                    {$priceDisplay}
                </span>
                <span class="card__price-type">
                    {priceTypeLabel}
                </span>
            </div>
        </div>
    </div>
</a>

<style>
    .card {
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

    .card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .card__image-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
    }

    .card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card__badge {
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

    .card__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--space-vertical-xs);
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        flex-grow: 1;
    }

    .card__header {
        display: flex;
        flex-direction: column;
    }

    .card__title {
        font-size: var(--text-md);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);

        /* Разрешаем перенос текста */
        white-space: normal;
        line-clamp: 2;
        /* Ограничиваем максимум 2 строки */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        /* Обрезаем, если больше 2 строк */
        overflow: hidden;

        /* Чтобы всегда было место под 2 строки, даже если текста меньше */

        font-size: var(--text-lg); /* базовый размер */
        font-weight: 600;
        margin: 0;
        color: var(--color-text);

        text-overflow: ellipsis;
    }

    .card__footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .card__details {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xxs);
    }

    .card__detail-top,
    .card__detail-bottom {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    .card__price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .card__price-value {
        font-size: var(--text-lg);
        font-weight: 500;
        color: var(--color-primary);
    }

    .card__price-type {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    /* Медиазапросы */

    /* 768px — карточка ~237 */
    @media (min-width: 768px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }
        .card__price-value {
            font-size: calc(var(--text-lg) * 0.88);
        }
        .card__content {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        }
    }

    /* 992px — карточка ~309 */
    @media (min-width: 992px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.95);
        }
        .card__price-value {
            font-size: calc(var(--text-lg) * 0.92);
        }
        .card__content {
            padding: calc(var(--space-vertical-sm) + 0.1rem)
                calc(var(--space-horizontal-sm) + 0.1rem);
        }
    }

    /* 1200px — карточка ~280 */
    @media (min-width: 1200px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }
        .card__price-value {
            font-size: calc(var(--text-lg) * 0.88);
        }
        .card__content {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        }
    }

    /* 1440px — карточка ~268 */
    @media (min-width: 1440px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.85);
        }
        .card__price-value {
            font-size: calc(var(--text-lg) * 0.8);
        }
        .card__content {
            padding: var(--space-vertical-xs) var(--space-horizontal-xs);
        }
    }
</style>
