<script>
    import RangeSlider from "$lib/components/UI/inputs/sliders/RangeSlider.svelte";
    import { createEventDispatcher } from "svelte";
    import { locale } from "$lib/stores/locale.js";

    export let currency;
    export let minPrice;
    export let maxPrice;
    export let currentRange;

    const dispatch = createEventDispatcher();

    function formatPrice(value) {
        return `${value.toFixed(0)} ${currency}`;
    }
    const labels = {
        price: {
            en: "by price",
            ru: "по цене",
        },
    };
</script>

<div class="filter-group">
    <span class="filter-title">{labels.price[$locale]} ({currency})</span>
    <RangeSlider
        min={minPrice}
        max={maxPrice}
        values={currentRange}
        format={formatPrice}
        on:change={(e) => {
            dispatch("change", e.detail);
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
