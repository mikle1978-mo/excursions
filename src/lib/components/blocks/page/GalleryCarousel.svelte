<!-- src\lib\components\blocks\page\GalleryCarousel.svelte -->

<script>
    import { error } from "@sveltejs/kit";
    import CardRenderer from "$lib/components/cards/CardRenderer.svelte";

    export let data;
    export let system;

    const slug = data?.slug;
    const lang = system?.lang;
    const type = system?.type;
    const relatedItems = system?.relatedItems;

    let items = [];
    // let loading = true;
</script>

<div class="carousel-window">
    <div class="image-gallery">
        {#each relatedItems as item (item.slug)}
            <div class="carousel-item">
                <CardRenderer {item} {type} {lang} />
            </div>
        {/each}
    </div>
</div>

<!-- {#if loading}
    <div>Loading...</div>
{:else}
    {"ghj"}
{/if} -->

<style>
    .carousel-window {
        /* max-width: 1200px; */
        margin: 0 auto;
        width: 100%;
        padding: var(--space-vertical-sm);
        background: var(--color-bg);

        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-lg);
    }
    .image-gallery {
        width: 100%;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;

        overflow-x: auto;
        overflow-y: hidden;

        display: flex;
        gap: 16px;

        /* padding: 16px; */

        scroll-snap-type: x mandatory;

        background: var(--color-bg);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-md);

        align-items: stretch;

        /* min-height: 370px; */
    }

    /* ВАЖНО: теперь управляем через wrapper */
    .carousel-item {
        flex: 0 0 320px;
        scroll-snap-align: start;

        text-decoration: none;
        color: inherit;

        display: block;
    }

    /* hover эффект */
    .carousel-item:hover {
        transform: translateY(-4px);
        transition: 0.2s ease;
    }

    /* скроллбар */
    .image-gallery::-webkit-scrollbar {
        height: 8px;
    }

    .image-gallery::-webkit-scrollbar-thumb {
        background: var(--color-primary);
        border-radius: 4px;
    }
    /* @media (max-width: 480px) {
        .image-gallery {
            padding: 0 var(--space-vertical-sm);
        }
    } */
    @media (max-width: 480px) {
        .carousel-window {
            margin: 0 var(--space-vertical-sm);
            width: calc(100% - 2 * var(--space-vertical-sm));
        }
    }
</style>
