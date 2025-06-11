<script>
    import { createEventDispatcher } from "svelte";
    import { locale } from "$lib/stores/locale";
    export let minRating = 0;

    const dispatch = createEventDispatcher();

    function setRating(rating) {
        dispatch("change", rating);
    }
    const labels = {
        rating: {
            en: "by rating",
            ru: "по рейтингу",
        },
    };
</script>

<div class="filter-group">
    <h4 class="filter-title">{labels.rating[$locale]}</h4>
    <div class="rating-stars">
        {#each [1, 2, 3, 4, 5] as star}
            <button
                class="star {minRating >= star ? 'active' : ''}"
                on:click={() => setRating(star)}
            >
                ★
            </button>
        {/each}
        {#if minRating > 0}
            <button class="clear-rating" on:click={() => setRating(0)}>
                &times;
            </button>
        {/if}
    </div>
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
    .rating-stars {
        display: flex;
        gap: var(--space-horizontal-xs);
        align-items: center;
    }

    .star {
        font-size: var(--text-lg);
        color: var(--color-gray-400);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: var(--transition-fast);
    }

    .star.active {
        color: var(--color-warning);
    }

    .star:hover {
        transform: scale(1.2);
    }
    .clear-rating {
        margin-left: var(--space-horizontal-sm);
        font-size: var(--text-sm);
        color: var(--color-error);
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.7;
    }
</style>
