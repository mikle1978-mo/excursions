<script>
    import { cardBlocks } from "$lib/components/blocks/card/cardBlocks.js";
    export let data;
</script>

<div class="card">
    <div class="card__header">
        {#each data.sections.filter((s) => s.position === "header") as section}
            <svelte:component
                this={cardBlocks[section.component]}
                data={section.data}
            />
        {/each}
    </div>

    <div class="card__content">
        {#each data.sections.filter((s) => !s.position || s.position === "content") as section}
            <svelte:component
                this={cardBlocks[section.component]}
                data={section.data}
            />
        {/each}
    </div>

    <div class="card__footer">
        {#each data.sections.filter((s) => s.position === "footer") as section}
            <svelte:component
                this={cardBlocks[section.component]}
                data={section.data}
            />
        {/each}
    </div>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: var(--radius-sm);
        overflow: hidden;
        transition: var(--transition-normal);
        height: 100%;
        min-height: 245px;
        gap: var(--space-vertical-xxs);
        padding-bottom: var(--space-vertical-xxs);
    }

    .card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .card__image-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        flex-shrink: 0;
    }

    .card__image {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card__badge {
        position: absolute;
        color: var(--color-light);
        padding: var(--space-vertical-xxs) var(--space-horizontal-xs);
        border-radius: var(--radius-sm);
        font-size: var(--text-xs);
        font-weight: 600;
    }

    .topleft {
        top: var(--space-vertical-xs);
        left: var(--space-horizontal-xs);
        background-color: var(--color-error);
    }
    .topright {
        top: var(--space-vertical-xs);
        right: var(--space-horizontal-xs);
        background-color: var(--color-accent);
    }
    .bottomleft {
        bottom: var(--space-vertical-xs);
        left: var(--space-horizontal-xs);
        background-color: var(--color-primary);
    }
    .bottomright {
        bottom: var(--space-vertical-xs);
        right: var(--space-horizontal-xs);
        background-color: var(--color-secondary);
    }

    .card__content {
        display: flex;
        flex-direction: column;
        padding: 0 var(--space-horizontal-sm);
        gap: 0;
        flex-grow: 1;
    }

    .card__header {
        display: flex;
        flex-direction: column;
    }

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
    }

    .card__footer {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 0 var(--space-horizontal-sm);
    }

    .card__details {
        display: none;
        flex-direction: column;
        gap: var(--space-vertical-xxs);
    }

    .card__detail-top,
    .card__detail-bottom {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    .card__price {
        display: flex;
        /* flex-direction: column; */
        align-items: center;
        gap: var(--space-horizontal-xs);
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
    /* .card__price-type {
        display: none;
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    } */

    /* Медиазапросы */

    @media (min-width: 480px) {
        .card {
            border-radius: var(--radius-sm);
            padding: 0;
        }
        .card__content {
            gap: var(--space-vertical-xs);
            padding: 0 var(--space-horizontal-sm);
        }
        .card__footer {
            display: flex;
            padding: 0 var(--space-horizontal-sm) var(--space-vertical-sm);
        }
    }
    /* 768px — карточка ~237 */
    @media (min-width: 768px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }
        .card__price-value,
        .card__old-price {
            font-size: calc(var(--text-lg) * 0.88);
        }
    }

    /* 992px — карточка ~309 */
    @media (min-width: 992px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.95);
        }
        .card__price-value,
        .card__old-price {
            font-size: calc(var(--text-lg) * 0.92);
        }
    }

    /* 1200px — карточка ~280 */
    @media (min-width: 1200px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }
        .card__price-value,
        .card__old-price {
            font-size: calc(var(--text-lg) * 0.88);
        }
    }

    /* 1440px — карточка ~268 */
    @media (min-width: 1440px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.85);
        }
        .card__price-value,
        .card__old-price {
            font-size: calc(var(--text-lg) * 0.8);
        }
    }
</style>
