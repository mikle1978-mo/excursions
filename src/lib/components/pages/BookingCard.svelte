<script>
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import { formatPrice } from "$lib/utils/priceFormatter.js";

    export let price = 0;
    export let priceType = "";
    export let active = false;
    export let locale = "en";
    export let onBook = () => {};

    const priceStore = formatPrice(price);
</script>

<aside class="booking-card">
    <div class="price-block">
        <span class="price">{$priceStore}</span>
        <span class="per-person">
            {#if priceType}
                {#if priceType === "per_day"}
                    {locale === "ru" ? "в день" : "per day"}
                {:else if priceType === "per_hour"}
                    {locale === "ru" ? "в час" : "per hour"}
                {:else if priceType === "per_week"}
                    {locale === "ru" ? "в неделю" : "per week"}
                {:else if priceType === "per_person"}
                    {locale === "ru" ? "с человека" : "per person"}
                {:else if priceType === "per_trip"}
                    {locale === "ru" ? "за поездку" : "per trip"}
                {/if}
            {/if}
        </span>
    </div>

    <button
        class="book-button"
        on:click={active ? onBook : null}
        disabled={!active}
        style="background-color: {active
            ? 'var(--color-primary)'
            : '#ccc'}; cursor: {active ? 'pointer' : 'not-allowed'}"
    >
        {active
            ? locale === "ru"
                ? "Забронировать"
                : "Book now"
            : locale === "ru"
              ? "Недоступно"
              : "Unavailable"}
    </button>

    <Share />
</aside>

<style>
    .booking-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-vertical-md);
        background: var(--color-bg);
        padding: var(--space-vertical-md);
        border-radius: var(--radius-md);
        align-self: start;
        position: sticky;
        top: var(--space-vertical-md);
    }

    @media (max-width: 768px) {
        .booking-card {
            position: static;
        }
    }

    .price-block {
        text-align: center;
    }

    .price-block .price {
        font-size: var(--text-xxl);
        font-weight: 700;
        color: var(--color-primary);
        display: block;
    }

    .price-block .per-person {
        font-size: var(--text-sm);
        color: var(--color-gray-600);
    }

    /* .details {
        display: grid;
        width: 100%;
        gap: var(--space-vertical-sm);
    } */

    .book-button {
        width: 100%;
        padding: var(--space-vertical-sm);
        background: var(--color-primary);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);
    }

    .book-button:hover {
        background: var(--color-primary-hover);
    }
</style>
