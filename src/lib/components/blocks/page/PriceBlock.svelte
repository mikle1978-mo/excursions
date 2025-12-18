<script>
    import { createPriceVM } from "$lib/features/priceBlock/priceBlock.price.vm";
    import { createTimerVM } from "$lib/features/priceBlock/priceBlock.timer.vm";
    import { selectedCurrency } from "$lib/stores/currency";
    import { appConfig } from "$lib/config/app.config";
    import { formatPrice } from "$lib/utils/priceFormatter";

    export let data;
    export let style = {};

    const priceVM = createPriceVM(data);
    const timerVM = createTimerVM(data);

    // $: currency = $selectedCurrency;
    // $: rate = appConfig.services.currency.fallbackRates[currency] ?? 1;

    // $: price = formatPrice(data.basePrice * rate, currency);
    // $: oldPrice = data.baseOldPrice
    //     ? formatPrice(data.baseOldPrice * rate, currency)
    //     : null;
</script>

<aside class="booking-card" data-variant={style.variant}>
    <div class="price-block">
        <div class="price-row">
            {#if data.isDiscountActive}
                <span class="discount">-{data.discount}%</span>
                <span class="old-price">{$priceVM.oldPrice}</span>
            {/if}

            <span class="price">{$priceVM.price}</span>
        </div>

        {#if data.priceTypeLabel}
            <span class="per-person">{data.priceTypeLabel}</span>
        {/if}

        {#if timerVM}
            <div class="discount-timer">
                {#each Object.entries($timerVM) as [key, value]}
                    <div class="time-block">
                        <div class="number">{value}</div>
                        <div class="label">{key}</div>
                    </div>
                {/each}
            </div>

            <span class="discountEndLabel">
                {data.discountEndLabel}
            </span>
        {/if}
    </div>
</aside>

<style>
    .booking-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-vertical-md);
        background: var(--color-bg);
        border-radius: var(--radius-md);
        align-self: start;
        top: var(--space-vertical-md);
    }

    .price-block {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: var(--space-vertical-xs);
    }

    .price-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-horizontal-xs);
    }

    .price-block .price {
        font-size: var(--text-xxl);
        font-weight: 700;
        color: var(--color-error);
    }

    .price-block .old-price {
        font-size: var(--text-xxl);
        font-weight: 700;
        color: var(--color-text);
        text-decoration-line: line-through;
        text-decoration-color: var(--color-error);
    }

    .price-block .discount {
        border-radius: var(--radius-sm);
        padding: 0 var(--space-horizontal-xs);
        font-size: var(--text-sm);
        color: var(--color-bg);
        background-color: var(--color-error);
        font-weight: 500;
    }

    .price-block .per-person {
        font-size: var(--text-sm);
        color: var(--color-gray-600);
    }

    .discount-timer {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }

    .time-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--color-gray-200);
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-sm);
        min-width: 3rem;
    }

    .number {
        font-size: var(--text-lg);
        font-weight: 700;
    }

    .label {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    .discountEndLabel {
        display: block;
        color: var(--color-gray-600);
    }

    /* Тёмная тема только для таймера */
    @media (prefers-color-scheme: dark) {
        .time-block {
            background: #2a2d31; /* тёмный фон таймера */
        }
        .label {
            color: #c4c4c4; /* светлый текст */
        }
        .discount {
            background-color: #f66e6e; /* скидка лучше контрастировать */
        }
    }
</style>
