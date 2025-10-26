<script>
    import IconReview from "$lib/icons/IconReview.svelte";
    export let rating = 0;
    export let reviewsCount = 0;
    // export let locale = "ru";
    // export let tReviews = { ru: "отз.", en: "reviews", tr: "yorum" };
</script>

<div class="rating">
    <span class="stars" style="--rating: {rating || 0}"></span>
    <span class="average">{rating}</span>
    <span class="count">({reviewsCount} <IconReview />)</span>
</div>

<style>
    .rating {
        display: flex;
        align-items: baseline;
        gap: var(--space-horizontal-xs);
        color: inherit;
        font-size: var(--text-md);
    }
    .average,
    .count {
        font-size: var(--text-xs);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    .stars {
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;

        line-height: 1;
    }
    .stars::before {
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
</style>
