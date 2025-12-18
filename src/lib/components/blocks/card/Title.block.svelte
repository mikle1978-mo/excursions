<script>
    export let data;

    const { context, title } = data;
</script>

<h2 class="card__title">
    <a href={context.href} class="card__title-link">{title}</a>
</h2>

<style>
    .card__title {
        font-size: var(--text-md);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);
        /* Разрешаем перенос текста */
        white-space: normal;
        line-clamp: 3;
        /* Ограничиваем максимум 2 строки */
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        /* Обрезаем, если больше 2 строк */
        overflow: hidden;
        /* Чтобы всегда было место под 2 строки, даже если текста меньше */
        font-size: var(--text-lg); /* базовый размер */
        font-weight: 600;
        margin: 0;
        color: var(--color-text);
        text-overflow: ellipsis;
        /* padding: var(--space-vertical-sm) var(--space-horizontal-sm); */
    }

    @media (min-width: 480px) {
    }
    /* 768px — карточка ~237 */
    @media (min-width: 768px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }
    }

    /* 992px — карточка ~309 */
    @media (min-width: 992px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.95);
        }
    }

    /* 1200px — карточка ~280 */
    @media (min-width: 1200px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }
    }

    /* 1440px — карточка ~268 */
    @media (min-width: 1440px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.85);
        }
    }
</style>
