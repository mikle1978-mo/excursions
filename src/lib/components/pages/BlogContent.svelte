<script>
    export let content = []; // массив объектов: { text, image }
</script>

{#if content?.length}
    <section class="blog-content">
        {#each content as block, i}
            <div class="blog-paragraph">
                {#if block.image?.length}
                    <div class="blog-image-wrapper">
                        <img
                            src={block.image[0].url}
                            alt={block.image[0].alt ?? `Image ${i + 1}`}
                            class="blog-image"
                            loading="lazy"
                        />
                    </div>
                {/if}

                {#if block.text}
                    <div class="blog-text">{@html block.text}</div>
                {/if}
            </div>
        {/each}
    </section>
{/if}

<style>
    .blog-content {
        width: 100%;
    }

    /* Контейнер для каждого параграфа */
    .blog-paragraph {
        margin-bottom: var(--space-vertical-md);
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    .blog-image-wrapper {
        display: flex;
        justify-content: center;
    }

    .blog-image {
        width: 100%;
        border-radius: 12px;
        object-fit: cover;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    /* Оставляем все твои оригинальные стили */
    .blog-content :global(p) {
        margin-bottom: var(--space-vertical-sm);
        font-size: var(--text-md);
        line-height: 1.6;
    }

    .blog-content :global(p:first-letter) {
        color: var(--color-primary);
        font-weight: 700;
    }

    .blog-content :global(strong) {
        color: var(--color-accent);
        font-weight: 700;
    }

    .blog-content :global(em) {
        font-style: italic;
    }

    .blog-content :global(u) {
        text-decoration: underline;
    }

    .blog-content :global(a) {
        color: var(--color-primary);
        text-decoration: none;
    }

    .blog-content :global(a:hover) {
        text-decoration: underline;
    }

    .blog-content :global(ul) {
        padding-left: 1.5em;
        list-style: disc;
        margin: 0.5em 0;
    }

    .blog-content :global(ol) {
        padding-left: 1.5em;
        margin: 0.5em 0;
    }

    .blog-content :global(li) {
        margin-bottom: 0.3em;
        line-height: 1.5;
    }

    .blog-content :global(h1) {
        font-size: var(--text-xxl);
        font-weight: 700;
        margin: 1em 0 0.5em 0;
    }

    .blog-content :global(h2) {
        font-size: var(--text-xl);
        font-weight: 600;
        margin: 0.8em 0 0.4em 0;
    }

    .blog-content :global(h3) {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0.6em 0 0.3em 0;
    }

    .blog-content :global(blockquote) {
        border-left: 4px solid var(--color-primary);
        padding-left: 1em;
        margin: 1em 0;
        font-style: italic;
    }

    @media (prefers-color-scheme: dark) {
        .blog-content {
            color: var(--color-gray-300);
        }

        .blog-content :global(.dropcap) {
            color: var(--color-primary);
        }

        .blog-content :global(strong) {
            color: var(--color-accent);
        }
    }

    @media (max-width: 768px) {
        .blog-content :global(p) {
            font-size: var(--text-sm);
            line-height: 1.5;
        }

        .blog-content :global(.dropcap) {
            font-size: 2.5em;
        }

        .blog-content :global(h1) {
            font-size: var(--text-xl);
        }

        .blog-content :global(h2) {
            font-size: var(--text-lg);
        }

        .blog-content :global(h3) {
            font-size: var(--text-md);
        }
    }
</style>
