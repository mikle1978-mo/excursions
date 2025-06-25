<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { car_card } from "$lib/i18n/car_card";
    import { formatPrice } from "$lib/utils/priceFormatter";
    export let car;

    export let loading = "lazy";
    const {
        slug = "/",
        title = "легковой автомобиль",
        images = ["/images/cars/car_default.webp"],
        duration = 2.5,
        groupSize = 10,
        price = 1500,
        discount = 0,
        rating = 4,
        reviewsCount = 142,
        meta = {},
    } = car;

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
<a class="car-card" href="/{$locale}/cars/{slug}">
    <div class="car-card__image-wrapper">
        <img
            src={images[0]}
            alt=""
            class="car-card__image"
            width="980"
            height="551"
            {loading}
            fetchpriority={loading === "eager" ? "high" : "auto"}
        />

        {#if getLabelByKey(meta.labels, "POPULAR")}
            <span class="car-card__badge topright">
                {getLabelByKey(meta.labels, "POPULAR").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "DISCOUNT")}
            <span class="car-card__badge bottomleft">
                {`-${discount}%`}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "NEW")}
            <span class="car-card__badge topleft">
                {getLabelByKey(meta.labels, "NEW").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "VIP")}
            <span class="car-card__badge bottomright">
                {getLabelByKey(meta.labels, "VIP").label[$locale]}
            </span>
        {/if}
    </div>

    <div class="car-card__content">
        <div class="car-card__header">
            <h2 class="car-card__title">{title[$locale]}</h2>
            <div class="car-card__rating">
                <span class="car-card__stars" style="--rating: {rating || 0};">
                </span>
                <span class="car-card__reviews"
                    >{reviewsCount}
                    {car_card.reviews[$locale]}</span
                >
            </div>
        </div>

        <div class="car-card__footer">
            <div class="car-card__details">
                <span class="car-card__duration"
                    >{duration} {car_card.hours[$locale]}</span
                >
                <span class="car-card__group-size"
                    >{car_card.before[$locale]}
                    {groupSize}
                    {car_card.people[$locale]}</span
                >
            </div>

            <div class="car-card__price">
                <span class="car-card__price-value">
                    {$priceDisplay}
                </span>
                <span class="car-card__price-per">
                    {car_card.per[car.priceType]?.[$locale] ?? ""}
                </span>
            </div>
        </div>
    </div>
</a>

<!-- {:else}
    <div></div>
{/if} -->

<style>
    .car-card {
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

    .car-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .car-card__image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
    }

    .car-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .car-card__badge {
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
    .car-card__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        flex-grow: 1;
    }

    .car-card__header {
        display: flex;
        flex-direction: column;
    }

    .car-card__title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);

        white-space: nowrap; /* Не переносить текст */
        overflow: hidden; /* Скрыть выходящий за пределы текст */
        text-overflow: ellipsis;
    }

    .car-card__rating {
        display: flex;
        align-items: flex-end;
        gap: var(--space-horizontal-xs);
    }

    .car-card__stars {
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;
        font-size: var(--text-lg);
        line-height: 1;
    }
    .car-card__stars::before {
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

    .car-card__reviews {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    /* .car-card__description {
        margin: 0;
        font-size: var(--text-sm);
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
        flex-grow: 1;
    } */

    .car-card__footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .car-card__details {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xxs);
    }

    .car-card__duration,
    .car-card__group-size {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    .car-card__price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .car-card__price-value {
        font-size: var(--text-lg);
        font-weight: 500;
        color: var(--color-primary);
    }

    .car-card__price-per {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    @media (max-width: 768px) {
        .car-card {
            flex-direction: column;
        }
        .car-card__content {
            display: flex;
            flex-direction: column;
            gap: var(--space-vertical-xs);
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
            flex-grow: 1;
        }
    }
</style>
