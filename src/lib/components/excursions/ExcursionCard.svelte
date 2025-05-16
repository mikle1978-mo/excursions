<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import IconMessage from "$lib/icons/IconMessage.svelte";
    import { labels } from "$lib/data/labels";
    import {
        initCurrencyService,
        fetchExchangeRates,
    } from "$lib/services/currencyService";
    import { derived } from "svelte/store";
    import {
        exchangeRates,
        selectedCurrency,
        isLoadingRates,
    } from "$lib/stores/currency";
    import { formatPrice } from "$lib/utils/priceFormatter";

    export let slug = "/";
    export let title = "Обзорная экскурсия по историческому центру";
    export let description =
        "Погрузитесь в атмосферу старого города с нашим профессиональным гидом. Узнайте тайны древних улочек и архитектурных шедевров.";
    export let images = ["/images/excursions/excursion_defoult.webp"];
    export let duration = 2.5;
    export let groupSize = 10;
    export let price = 1500;
    export let rating = 4;
    export let reviews = 142;
    export let isPopular = true;

    // Генерация звезд рейтинга
    const stars = "★★★★★".slice(0, rating) + "☆☆☆☆☆".slice(0, 5 - rating);

    let isMounted = false;
    const priceDisplay = formatPrice(price);

    onMount(async () => {
        await initCurrencyService();
        isMounted = true;
    });
</script>

{#if isMounted}
    <div class="excursion-card">
        <div class="excursion-card__image-wrapper">
            <img src={images[0]} alt={title} class="excursion-card__image" />
            {#if isPopular}
                <span class="excursion-card__badge"
                    >{labels.popular[$locale]}</span
                >
            {/if}
        </div>

        <a href="/{$locale}/excursions/{slug}" class="excursion-card__content">
            <div class="excursion-card__header">
                <h3 class="excursion-card__title">{title[$locale]}</h3>
                <div class="excursion-card__rating">
                    <span class="excursion-card__stars">{stars} </span>
                    <span class="excursion-card__reviews"
                        >{reviews} {labels.reviews[$locale]}</span
                    >
                </div>
            </div>

            <p class="excursion-card__description">
                {description[$locale]}
            </p>

            <div class="excursion-card__footer">
                <div class="excursion-card__details">
                    <span class="excursion-card__duration">{duration} часа</span
                    >
                    <span class="excursion-card__group-size"
                        >до {groupSize} человек</span
                    >
                </div>

                <div class="excursion-card__price">
                    <span class="excursion-card__price-value">
                        {$priceDisplay}
                    </span>
                    <span class="excursion-card__price-per"
                        >{labels.perPerson[$locale]}</span
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
        aspect-ratio: 16/9;
    }

    .excursion-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .excursion-card__badge {
        position: absolute;
        top: var(--space-vertical-xs);
        right: var(--space-horizontal-xs);
        background-color: var(--color-accent);
        color: var(--color-light);
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        border-radius: var(--radius-sm);
        font-size: var(--text-xs);
        font-weight: 600;
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
        gap: var(--space-vertical-xxs);
    }

    .excursion-card__title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);
    }

    .excursion-card__rating {
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xs);
    }

    .excursion-card__stars {
        color: var(--color-warning);
        font-size: var(--text-sm);
    }

    .excursion-card__reviews {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    .excursion-card__description {
        margin: 0;
        font-size: var(--text-sm);
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
        flex-grow: 1;
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
