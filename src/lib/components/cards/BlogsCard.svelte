<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { card } from "$lib/i18n/card";
    import { formatPrice } from "$lib/utils/priceFormatter";
    import getOldPrice from "$lib/utils/getOldPrice";
    import Rating from "../UI/rating/Rating.svelte";
    import { getCloudinarySrcset } from "$lib/helpers/optimizeCloudinary.js";
    import { get } from "svelte/store";
    import { formatDate } from "$lib/utils/dateFormatter";

    export let item;
    export let type;
    let imageSrcset = { src: image, srcset: "" };

    export let loading = "lazy";
    const defaultImage = `/images/${type}/${type}_default.webp`;

    $: slug = item.slug;
    $: title = item.title ?? "";
    $: description = item.description ?? "";
    $: publishDate = item.publishDate ?? "";
    $: image = item.images?.[0]?.url ?? defaultImage;
    $: priceDisplay = formatPrice(item.price);
    $: oldPriceDisplay = formatPrice(getOldPrice(item.price, item.discount));
    $: priceType =
        item.priceType && card[item.priceType] ? item.priceType : "per_person";
    $: priceTypeLabel = card[priceType]?.[$locale] ?? "";
    $: discount = item.discount ?? 0;
    $: discountEnd = item.discountEnd ?? 0;
    $: fuelLabel = item.fuel ? (card[item.fuel]?.[$locale] ?? item.fuel) : "";
    $: transmissionLabel = item.transmission
        ? (card[item.transmission]?.[$locale] ?? item.transmission)
        : "";
    $: detailTop = item.duration
        ? ``
        : // ? `${item.duration} ${type === "transfers" ? card.minutes[$locale] : card.hours[$locale]}`
          (transmissionLabel ?? "");
    $: detailBottom =
        type === "transfers"
            ? `${card.before[$locale]} ${item.car.seats} ${card.people[$locale]}`
            : item.groupSize
              ? ``
              : //   ? `${card.before[$locale]} ${item.groupSize} ${card.people[$locale]}`
                (fuelLabel ?? "");
    $: rating = item.rating ?? 5;
    $: reviewsCount = item.reviewsCount ?? 10;
    $: meta = item.meta ?? {};
    // $: imageSrcset = getCloudinarySrcset(image, [400, 600, 800, 980]);

    function onImageError(event) {
        console.log(`Image error for ${event.target.src}`);

        if (event.target.src !== defaultImage) {
            event.target.src = defaultImage;
            event.target.srcset = "";
        }
    }

    let isMounted = false;

    function getLabelByKey(labelsArray, key) {
        return labelsArray.find((item) => item.key === key);
    }

    onMount(async () => {
        imageSrcset = getCloudinarySrcset(image, [400, 600, 800, 980]);
        isMounted = true;
    });
</script>

<div class="card">
    <a href="/{$locale}/{type}/{slug}" class="card__image-wrapper">
        <img
            src={imageSrcset.src}
            srcset={imageSrcset.srcset}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            alt={`${title} ${type}`}
            class="card__image"
            {loading}
            fetchpriority={loading === "eager" ? "high" : "auto"}
            decoding="async"
            width="600"
            height="338"
            onerror={onImageError}
        />

        {#if getLabelByKey(meta.labels, "POPULAR")}
            <span class="card__badge topright">
                {getLabelByKey(meta.labels, "POPULAR").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "DISCOUNT") && discount > 0 && new Date(discountEnd) > new Date()}
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
    </a>

    <div class="card__content">
        <div class="card__header">
            <h2 class="card__title">
                <a href="/{$locale}/{type}/{slug}">{title}</a>
                <span class="card__detail-top">{description} </span>
            </h2>
        </div>

        <div class="card__footer">
            <div class="card__details">
                <span class="card__detail-bottom">
                    {formatDate(publishDate, $locale)}
                </span>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: unset;
        overflow: hidden;
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
        padding: var(--space-vertical-xxs) var(--space-horizontal-xs);
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
        gap: 0;
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
        line-clamp: 3;
        /* Ограничиваем максимум 2 строки */
        display: -webkit-box;
        -webkit-line-clamp: 3;
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
        justify-content: flex-end;
        align-items: flex-end;
    }

    .card__details {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--space-vertical-xxs);
    }

    .card__detail-top {
        font-size: var(--text-xs);
        font-weight: 400;
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    .card__detail-bottom {
        font-size: calc(var(--text-xs) * 0.9);
        font-weight: 400;
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    /* Медиазапросы */

    @media (min-width: 480px) {
        .card {
            border-radius: var(--radius-md);
        }
        .card__content {
            gap: var(--space-vertical-xs);
        }
        .card__details {
            display: flex;
        }
        .card__footer {
            justify-content: space-between;
        }
        /* .card__price-type {
            display: block;
        } */
    }
    /* 768px — карточка ~237 */
    @media (min-width: 768px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
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
        .card__content {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        }
    }

    /* 1440px — карточка ~268 */
    @media (min-width: 1440px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.85);
        }
        .card__content {
            padding: var(--space-vertical-xs) var(--space-horizontal-xs);
        }
    }
</style>
