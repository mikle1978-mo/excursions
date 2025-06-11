<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";

    export let item;

    const {
        title = { ru: "", en: "" },
        img: image = "/images/excursions/excursion_default.webp",
        link: slug = "",
    } = item;

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <a class="excursion-card" href="/{$locale}/{slug}">
        <div class="excursion-card__image-wrapper">
            <img
                src={image}
                alt={title[$locale]}
                class="excursion-card__image"
            />
        </div>

        <div class="excursion-card__content">
            <div class="excursion-card__header">
                <h2 class="excursion-card__title">{title[$locale]}</h2>
            </div>
        </div>
    </a>
{:else}
    <div></div>
{/if}

<style>
    .excursion-card {
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

    .excursion-card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .excursion-card__image-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
    }

    .excursion-card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .excursion-card__content {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        flex-grow: 1;
    }

    .excursion-card__header {
        display: flex;
        flex-direction: column;
    }

    .excursion-card__title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);
    }

    @media (max-width: 768px) {
        .excursion-card {
            flex-direction: column;
        }
        .excursion-card__content {
            display: flex;
            flex-direction: column;
            gap: var(--space-vertical-xs);
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
            flex-grow: 1;
        }
    }
</style>
