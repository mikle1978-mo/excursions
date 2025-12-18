<script>
    import { onMount } from "svelte";
    import { formatPrice } from "$lib/utils/priceFormatter";
    import getOldPrice from "$lib/utils/getOldPrice";
    import Rating from "../ui/rating/Rating.svelte";
    import { getCloudinarySrcset } from "$lib/helpers/optimizeCloudinary.js";
    import { getLocalizedPath } from "$lib/stores/locale";

    export let item;
    export let type;
    export let locale = "ru";
    export let loading = "lazy";

    const defaultImage = `/images/${type}/${type}_default.webp`;

    let slug = item.slug;
    let title = item.title ?? "";
    let image = item.images?.[0]?.url ?? defaultImage;
    let imageSrcset = { src: image, srcset: "" };
    let rating = item.rating ?? 5;
    let reviewsCount = item.reviewsCount ?? 0;
    let discount = item.discount ?? 0;

    $: priceDisplay = formatPrice(item.price);
    $: oldPriceDisplay = formatPrice(getOldPrice(item.price, discount));

    function onImageError(e) {
        if (e.target.src !== defaultImage) {
            e.target.src = defaultImage;
            e.target.srcset = "";
        }
    }

    onMount(() => {
        imageSrcset = getCloudinarySrcset(image, [400, 600, 800]);
    });
</script>

<div class="related-card">
    <div class="related-card__content">
        <h3 class="related-card__title">
            <a href={getLocalizedPath(locale, `${type}/${slug}`)}>{title}</a>
        </h3>

        <div class="related-card__meta">
            <Rating {rating} {reviewsCount} {locale} />
            <div class="related-card__price">
                {#if discount > 0}
                    <span class="related-card__old">{oldPriceDisplay}</span>
                {/if}
                <span class="related-card__current">{priceDisplay}</span>
            </div>
        </div>
    </div>

    <div class="related-card__image-wrapper">
        <img
            src={imageSrcset.src}
            srcset={imageSrcset.srcset}
            sizes="(max-width: 768px) 100vw, 400px"
            alt={title}
            class="related-card__image"
            {loading}
            decoding="async"
            onerror={onImageError}
        />
    </div>
</div>

<style>
    .related-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        overflow: hidden;
        text-decoration: none;
        color: var(--color-text);
        transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        height: 100%;
        box-shadow: var(--shadow-sm);
    }

    .related-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
    }

    .related-card__content {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        flex: 1 1 auto;
    }

    .related-card__title {
        font-size: var(--text-md);
        font-weight: 600;
        margin: 0;
        line-height: 1.3;
    }

    .related-card__title a {
        color: var(--color-text);
        text-decoration: none;
        transition: color 0.2s ease;
    }

    .related-card__title a:hover {
        color: var(--color-primary);
    }

    .related-card__meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.4rem;
        margin-top: 0.3rem;
    }

    .related-card__price {
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    .related-card__old {
        text-decoration: line-through;
        color: var(--color-gray-500);
        font-size: 0.9rem;
    }

    .related-card__current {
        color: var(--color-error);
        font-weight: 600;
        font-size: 1rem;
    }

    .related-card__image-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
    }

    .related-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.4s ease;
    }

    .related-card:hover .related-card__image {
        transform: scale(1.05);
    }
</style>
