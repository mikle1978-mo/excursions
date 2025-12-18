<script>
    export let data;

    const { section, context, overlays } = data;
</script>

<a href={context.href} class="card__image-wrapper">
    <img
        src={section.image.src}
        srcset={section.image.srcset}
        sizes={section.image.sizesAttr}
        loading={section.image.loading}
        decoding={section.image.decoding}
        fetchpriority={section.image.fetchpriority}
        width={section.image.width}
        height={section.image.height}
        alt={section.title || "Card image"}
        class="card__image"
    />

    {#if overlays?.badges}
        {#each overlays.badges as badge}
            <span class={`card__badge ${badge.position}`}>
                {badge.text}
            </span>
        {/each}
    {/if}
</a>

<style>
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
</style>
