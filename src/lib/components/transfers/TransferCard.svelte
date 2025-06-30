<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { transfer_card } from "$lib/i18n/transfer_card";
    import { formatPrice } from "$lib/utils/priceFormatter";
    import Rating from "../UI/rating/Rating.svelte";
    export let transfer;

    export let loading = "lazy";
    const {
        slug = "/",
        title = "Обзорная экскурсия по историческому центру",
        images = [{ url: "/images/transfers/transfer_default.webp" }],
        duration = 2.5,
        groupSize = 10,
        price = 1500,
        discount = 0,
        rating = 4,
        reviewsCount = 142,
        meta = {},
    } = transfer;

    let isMounted = false;
    const priceDisplay = formatPrice(price);

    function getLabelByKey(labelsArray, key) {
        return labelsArray.find((item) => item.key === key);
    }

    onMount(async () => {
        isMounted = true;
    });
</script>

<!-- {#if isMounted} -->
<a class="transfer-card" href="/{$locale}/transfers/{slug}">
    <div class="transfer-card__image-wrapper">
        <img
            src={images[0]?.url}
            alt=""
            class="transfer-card__image"
            width="980"
            height="551"
            {loading}
            fetchpriority={loading === "eager" ? "high" : "auto"}
        />

        {#if getLabelByKey(meta.labels, "POPULAR")}
            <span class="transfer-card__badge topright">
                {getLabelByKey(meta.labels, "POPULAR").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "DISCOUNT")}
            <span class="transfer-card__badge bottomleft">
                {`-${discount}%`}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "NEW")}
            <span class="transfer-card__badge topleft">
                {getLabelByKey(meta.labels, "NEW").label[$locale]}
            </span>
        {/if}
        {#if getLabelByKey(meta.labels, "VIP")}
            <span class="transfer-card__badge bottomright">
                {getLabelByKey(meta.labels, "VIP").label[$locale]}
            </span>
        {/if}
    </div>

    <div class="transfer-card__content">
        <div class="transfer-card__header">
            <h2 class="transfer-card__title">{title[$locale]}</h2>
            <Rating {rating} {reviewsCount} locale={$locale} />
        </div>

        <div class="transfer-card__footer">
            <div class="transfer-card__details">
                <span class="transfer-card__duration"
                    >{duration} {transfer_card.hours[$locale]}</span
                >
                <span class="transfer-card__group-size"
                    >{transfer_card.before[$locale]}
                    {groupSize}
                    {transfer_card.people[$locale]}</span
                >
            </div>

            <div class="transfer-card__price">
                <span class="transfer-card__price-value">
                    {$priceDisplay}
                </span>
                <span class="transfer-card__price-per">
                    {transfer_card.per[transfer.priceType]?.[$locale] ?? ""}
                </span>
            </div>
        </div>
    </div>
</a>

<!-- {:else}
    <div></div>
{/if} -->

<style>
    .transfer-card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        overflow: hidden;
        box-shadow: var(--shadow-md);
        transition: var(--transition-normal);
        height: 100%;
        min-height: 245px;
    }

    .transfer-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .transfer-card__image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
    }

    .transfer-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .transfer-card__badge {
        position: absolute;
        color: var(--color-light);
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
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
    .transfer-card__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        flex-grow: 1;
    }

    .transfer-card__header {
        display: flex;
        flex-direction: column;
    }

    .transfer-card__title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);

        white-space: nowrap; /* Не переносить текст */
        overflow: hidden; /* Скрыть выходящий за пределы текст */
        text-overflow: ellipsis;
    }

    .transfer-card__footer {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .transfer-card__details {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xxs);
    }

    .transfer-card__duration,
    .transfer-card__group-size {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xxs);
    }

    .transfer-card__price {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .transfer-card__price-value {
        font-size: var(--text-lg);
        font-weight: 500;
        color: var(--color-primary);
    }

    .transfer-card__price-per {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    @media (max-width: 768px) {
        .transfer-card {
            flex-direction: column;
        }
        .transfer-card__content {
            display: flex;
            flex-direction: column;
            gap: var(--space-vertical-xs);
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
            flex-grow: 1;
        }
    }
</style>
