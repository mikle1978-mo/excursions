<script>
    import RangeSlider from "$lib/components/ui/inputs/sliders/RangeSlider.svelte";
    import { createEventDispatcher } from "svelte";
    import { filterState } from "$lib/stores/filterState";
    import { selectedCurrency } from "$lib/stores/currency.js";

    export let lang = "en";
    export let items = [];
    export let rates = 1;

    $: currency = $selectedCurrency;
    $: prices = items.map((i) => Number(i.price || 0));

    $: convertedPrices = prices.map((p) => convertPrice(p, currency));

    $: minPrice = convertedPrices.length ? Math.min(...convertedPrices) - 1 : 0;
    $: maxPrice = convertedPrices.length ? Math.max(...convertedPrices) + 1 : 0;

    $: currentRange = [
        $filterState.price?.[0] != null
            ? convertPrice($filterState.price[0], currency)
            : minPrice,
        $filterState.price?.[1] != null
            ? convertPrice($filterState.price[1], currency)
            : maxPrice,
    ];

    function toBase(value) {
        return value / rates[currency];
    }

    const dispatch = createEventDispatcher();

    function formatPrice(value) {
        return `${value.toFixed(0)} ${currency}`;
    }
    function convertPrice(price, currency) {
        return price * (rates[currency] || 1);
    }

    const labels = {
        price: {
            en: "by price",
            ru: "по цене",
        },
    };
</script>

<div class="filter-group">
    <span class="filter-title">{labels.price[lang]} ({currency})</span>
    <RangeSlider
        min={minPrice}
        max={maxPrice}
        values={currentRange}
        format={formatPrice}
        on:change={(e) => {
            const [min, max] = e.detail;

            dispatch("change", [
                min / (rates[currency] || 1),
                max / (rates[currency] || 1),
            ]);
        }}
    />
</div>

<style>
    .filter-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        box-shadow: var(--shadow-sm);
        padding: var(--space-vertical-xs) 0;
    }

    .filter-title {
        font-size: var(--text-md);
        font-weight: 500;
        color: var(--color-text);
    }
</style>
