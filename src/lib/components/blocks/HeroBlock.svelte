<script>
    import Rating from "../UI/rating/Rating.svelte";
    import IconClock from "$lib/icons/IconClock.svelte";
    import IconGroup from "$lib/icons/IconGroup.svelte";
    import ShareIcon from "../UI/buttons/ShareIcon.svelte";
    import { getCloudinarySrcset } from "$lib/utils/optimizeCloudinary.js";

    export let imageUrl = "/rafting.jpg";
    export let title = "Rafting from Kemer";
    export let subtitle = "Adrenaline and nature";
    export let rating;
    export let reviewsCount;
    export let locale = "en";

    $: effectiveLocale = locale || "en";

    // Для HeroBlock вычисляем srcset
    $: heroImage = getCloudinarySrcset(imageUrl, [400, 800, 1200, 1600, 1920]);
</script>

<div class="hero">
    <div class="image-wrapper">
        <img
            src={heroImage.src}
            srcset={heroImage.srcset}
            sizes="(max-width: 768px) 100vw, 100vw"
            alt={title || "cover"}
            decoding="async"
            loading="lazy"
            class="hero-img"
        />
    </div>
    <div class="hero-content">
        <div class="top-row">
            {#if rating}
                <Rating {rating} {reviewsCount} locale={effectiveLocale} />
            {/if}
            <ShareIcon />
        </div>

        {#if title}
            <h1 class="title">{title}</h1>
        {/if}

        {#if subtitle}
            <div class="subtitle">{subtitle}</div>
        {/if}
    </div>
</div>

<style>
    .hero {
        margin: 0 auto;
    }

    .image-wrapper {
        position: relative;
        overflow: hidden;
    }

    .hero img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .hero-content {
        position: relative;
        padding: 0 var(--space-vertical-sm);
    }

    .title {
        font-size: var(--text-xxl);
        font-weight: bold;
    }

    .subtitle {
        font-size: var(--text-xl);
    }

    /* Стили для больших экранов (768px и выше) */
    @media (min-width: 768px) {
        .hero {
            width: 100%;
            margin: 0;
            position: relative;
            height: 100vh;
            max-height: 800px;
        }

        .image-wrapper {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
        }

        .hero img {
            width: 100%;
            height: 100%;
            aspect-ratio: unset;
            object-fit: cover;
            margin: 0;
            padding: 0;
        }

        .hero-content {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            color: var(--color-bg);
            max-width: var(--max-width-container);
            background: linear-gradient(
                to bottom,
                rgba(var(--color-dark-rgb), 0.6) 0%,
                rgba(var(--color-dark-rgb), 0.3) 50%,
                rgba(var(--color-dark-rgb), 0.1) 100%
            );
            padding: var(--space-vertical-xl) var(--space-horizontal-xl);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: start;
            text-align: start;
            color: var(--color-light);
        }

        .top-row {
            color: var(--color-bg);
            padding: 0;
            width: 100%;
            max-width: 500px;
            justify-content: start;
            gap: var(--space-horizontal-md);
        }

        .title {
            font-size: clamp(var(--text-xxl), 5vw, var(--text-xxxl));
            margin: 0 0 var(--space-vertical-md) 0;

            text-shadow: 2px 2px 4px rgba(var(--color-dark-rgb), 0.5);
            line-height: 1.2;
        }

        .subtitle {
            font-size: clamp(var(--text-lg), 3vw, var(--text-xxl));
            color: rgba(var(--color-bg-rgb), 0.9);
            text-shadow: 1px 1px 2px rgba(var(--color-dark-rgb), 0.5);
            margin: 0;
        }
    }

    /* Дополнительная адаптация для очень больших экранов */
    @media (min-width: 1200px) {
        .hero {
            max-height: 900px;
        }

        .hero-content {
            padding: var(--space-vertical-xxl) var(--space-horizontal-xxl);
        }
    }

    @media (min-width: 1600px) {
        .hero {
            max-height: 1000px;
        }
    }

    @media (prefers-color-scheme: dark) {
        .subtitle {
            color: var(--color-gray-400);
        }

        /* Для темной темы на больших экранах */
        @media (min-width: 768px) {
            .hero-content {
                background: linear-gradient(
                    to bottom,
                    rgba(var(--color-dark-rgb), 0.7) 0%,
                    rgba(var(--color-dark-rgb), 0.4) 50%,
                    rgba(var(--color-dark-rgb), 0.2) 100%
                );
            }
        }
    }
</style>
