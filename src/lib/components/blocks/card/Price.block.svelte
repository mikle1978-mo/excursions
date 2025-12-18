<script>
    import Rating from "$lib/components/UI/rating/Rating.svelte";
    import { createPriceVM } from "$lib/features/priceBlock/priceBlock.price.vm.js";
    export let data;
    const { price, oldPrice, discount } = data;

    const priceVM = createPriceVM(data);
</script>

<div class="card__price">
    <span class="card__price-value">
        {#if $priceVM.oldPrice}
            <span class="card__old-price">{$priceVM.oldPrice}</span>
        {/if}
        <span>{$priceVM.price}</span>
    </span>
</div>

<style>
    .card__price {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card__price-value {
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
        font-size: var(--text-lg);
        font-weight: 500;
        color: var(--color-error);
    }

    .card__old-price {
        text-decoration: line-through;
        font-weight: 500;
        font-size: var(--text-lg);
        color: var(--color-gray-600);
    }
</style>
