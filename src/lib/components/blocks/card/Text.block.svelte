<script>
    export let data;

    const { context, text } = data;
</script>

<span class="card__text">{text}</span>

<style>
    .card__text {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    @media (min-width: 480px) {
    }
    /* 768px — карточка ~237 */
    @media (min-width: 768px) {
        .card__text {
            font-size: calc(var(--text-md) * 0.9);
        }
    }

    /* 992px — карточка ~309 */
    @media (min-width: 992px) {
        .card__text {
            font-size: calc(var(--text-md) * 0.95);
        }
    }

    /* 1200px — карточка ~280 */
    @media (min-width: 1200px) {
        .card__text {
            font-size: calc(var(--text-md) * 0.9);
        }
    }

    /* 1440px — карточка ~268 */
    @media (min-width: 1440px) {
        .card__text {
            font-size: calc(var(--text-md) * 0.85);
        }
    }
</style>
