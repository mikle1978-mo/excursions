<script>
    export let rating = 0;
    export let reviewsCount = 0;
    export let locale = "ru";
    export let tReviews = { ru: "отз.", en: "reviews", tr: "yorum" };
</script>

<div class="rating">
    <span class="stars" style="--rating: {rating || 0}"></span>
    <span>{rating}</span>
    <span>({reviewsCount} {tReviews[locale]})</span>
</div>

<style>
    .rating {
        display: flex;
        align-items: сenter;
        gap: var(--space-horizontal-xs);
        color: var(--color-gray-600);
    }
    .stars {
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;
        font-size: var(--text-lg);
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
    @media (prefers-color-scheme: dark) {
        .rating {
            color: var(--color-gray-400);
        }
    }
</style>
