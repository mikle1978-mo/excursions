<script>
    import { CardPriceVM } from "$lib/features/card/card.price.vm.js";
    import Rating from "$lib/components/UI/rating/Rating.svelte";
    export let data;
    // export let loading = "lazy";

    const priceVM = CardPriceVM(data.price);

    function onImageError(e) {
        if (e.target.src !== data.defaultImage) {
            e.target.src = data.defaultImage;
            e.target.srcset = "";
        }
    }
</script>

<div class="card">
    <a href={data.href} class="card__image-wrapper">
        <img
            src={data.image.src}
            srcset={data.image.srcset}
            sizes={data.image.sizesAttr}
            loading={data.image.loading}
            decoding={data.image.decoding}
            fetchpriority={data.image.fetchpriority}
            width={data.image.width}
            height={data.image.height}
            alt={data.title}
            class="card__image"
        />

        {#each data.badges as badge}
            <span class={`card__badge ${badge.position}`}>
                {badge.text}
            </span>
        {/each}
    </a>

    <div class="card__content">
        <div class="card__header">
            <h2 class="card__title">
                <a href={data.href}>{data.title}</a>
            </h2>

            {#if data.rating}
                <Rating
                    rating={data.rating.value}
                    reviewsCount={data.rating.count}
                />
            {/if}
        </div>

        <div class="card__footer">
            {#if data.price.value}
                <div class="card__price">
                    {#if data.price.old}
                        <span class="card__old-price"
                            >{$priceVM.formattedPrice.old}</span
                        >
                    {/if}
                    <span class="card__price-value"
                        >{$priceVM.formattedPrice.current}</span
                    >
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: unset;
        overflow: hidden;
        transition: var(--transition-normal);
        height: 100%;
        min-height: 245px;
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
        justify-content: space-between;
        gap: 0;
        padding: var(--space-vertical-md) var(--space-horizontal-md);
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
            border-radius: var(--radius-md);
        }
        .card__content {
            gap: var(--space-vertical-xs);
        }
        .card__details {
            display: flex;
        }
        .card__footer {
            justify-content: space-between;
        }
        /* .card__price-type {
            display: block;
        } */
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
        .card__content {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
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
        .card__content {
            padding: calc(var(--space-vertical-sm) + 0.1rem)
                calc(var(--space-horizontal-sm) + 0.1rem);
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
        .card__content {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
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
        .card__content {
            padding: var(--space-vertical-xs) var(--space-horizontal-xs);
        }
    }
</style>
