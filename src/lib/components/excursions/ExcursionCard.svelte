<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { initCurrencyService } from "$lib/services/currencyService";
    import { excursion_card } from "$lib/i18n/excursion_card";
    import { formatPrice } from "$lib/utils/priceFormatter";
    export let excursion;
    const {
        slug = "/",
        title = "Обзорная экскурсия по историческому центру",
        images = ["/images/excursions/excursion_defoult.webp"],
        duration = 2.5,
        groupSize = 10,
        price = 1500,
        discount = 0,
        rating = 4,
        reviewsCount = 142,
        meta = {},
    } = excursion;

    let isMounted = false;
    const priceDisplay = formatPrice(price);

    function getLabelByKey(labelsArray, key) {
        return labelsArray.find((item) => item.key === key);
    }

    onMount(async () => {
        await initCurrencyService();
        isMounted = true;
    });
</script>

{#if isMounted}
    <div class="excursion-card">
        <div class="excursion-card__image-wrapper">
            <img src={images[0]} alt={title} class="excursion-card__image" />

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

        <a href="/{$locale}/excursions/{slug}" class="excursion-card__content">
            <div class="excursion-card__header">
                <h3 class="excursion-card__title">{title[$locale]}</h3>
                <div class="excursion-card__rating">
                    <span
                        class="excursion-card__stars"
                        style="--rating: {rating || 0};"
                    >
                    </span>
                    <span class="excursion-card__reviews"
                        >{reviewsCount}
                        {excursion_card.reviews[$locale]}</span
                    >
                </div>
            </div>

            <!-- <p class="excursion-card__description">
                {description[$locale]}
            </p> -->

            <div class="excursion-card__footer">
                <div class="excursion-card__details">
                    <span class="excursion-card__duration"
                        >{duration} {excursion_card.hours[$locale]}</span
                    >
                    <span class="excursion-card__group-size"
                        >{excursion_card.before[$locale]}
                        {groupSize}
                        {excursion_card.people[$locale]}</span
                    >
                </div>

                <div class="excursion-card__price">
                    <span class="excursion-card__price-value">
                        {$priceDisplay}
                    </span>
                    <span class="excursion-card__price-per"
                        >{excursion_card.perPerson[$locale]}</span
                    >
                </div>
            </div>

            <!-- <button class="excursion-card__button">Забронировать</button> -->
        </a>
    </div>
{:else}
    <div></div>
{/if}

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
    }

    .excursion-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .excursion-card__image-wrapper {
        position: relative;
        width: 100%;
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
    }

    .excursion-card__rating {
        display: flex;
        align-items: flex-end;
        gap: var(--space-horizontal-xs);
    }

    .excursion-card__stars {
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;
        font-size: var(--text-lg);
        line-height: 1;
    }
    .excursion-card__stars::before {
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

    .excursion-card__reviews {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    /* .excursion-card__description {
        margin: 0;
        font-size: var(--text-sm);
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
        flex-grow: 1;
    } */

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

    /* .excursion-card__button {
        font-family: inherit;
        width: 100%;
        padding: var(--space-vertical-sm) var(--space-horizontal-md);
        background-color: var(--color-primary);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-sm);
        font-size: var(--text-md);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);
        margin-top: var(--space-vertical-xs);
    }

    .excursion-card__button:hover {
        background-color: var(--color-primary-hover);
    } */

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
