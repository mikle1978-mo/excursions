<script>
    export let props;
    const data = Object.fromEntries(props.fields.map((f) => [f.key, f.value]));
    const description = data.description;
</script>

{#if description}
    <div class="description-block">
        {@html description}
    </div>
{/if}

<style>
    .description-block {
        color: var(--color-gray-700);
        line-height: 1.6;
        padding: 0;
        /* margin: 1em 0; */
    }

    /* Стили для всего HTML контента внутри блока */
    .description-block :global(p) {
        margin-bottom: var(--space-vertical-sm);
        font-size: var(--text-md);
        line-height: 1.6;
    }

    .description-block :global(p:first-letter) {
        color: var(--color-primary);
        font-weight: 700;
    }

    .description-block :global(strong) {
        color: var(--color-accent);
        font-weight: 700;
    }

    .description-block :global(em) {
        font-style: italic;
    }

    .description-block :global(u) {
        text-decoration: underline;
    }

    .description-block :global(a) {
        color: var(--color-primary);
        text-decoration: none;
    }

    .description-block :global(a:hover) {
        text-decoration: underline;
    }

    .description-block :global(ul) {
        padding-left: 1.5em;
        list-style: disc;
        margin: 0.5em 0;
    }

    .description-block :global(ol) {
        padding-left: 1.5em;
        margin: 0.5em 0;
    }

    .description-block :global(li) {
        margin-bottom: 0.3em;
        line-height: 1.5;
    }

    .description-block :global(h1) {
        font-size: var(--text-xxl);
        font-weight: 700;
        margin: 1em 0 0.5em 0;
    }

    .description-block :global(h2) {
        font-size: var(--text-xl);
        font-weight: 600;
        margin: 0.8em 0 0.4em 0;
    }

    .description-block :global(h3) {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0.6em 0 0.3em 0;
    }

    .description-block :global(blockquote) {
        border-left: 4px solid var(--color-primary);
        padding-left: 1em;
        margin: 1em 0;
        font-style: italic;
    }

    /* Темная тема */
    @media (prefers-color-scheme: dark) {
        .description-block {
            color: var(--color-gray-300);
        }

        .description-block :global(.dropcap) {
            color: var(--color-primary);
        }

        .description-block :global(strong) {
            color: var(--color-accent);
        }
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        .description-block :global(p) {
            font-size: var(--text-sm);
            line-height: 1.5;
        }

        .description-block :global(.dropcap) {
            font-size: 2.5em;
        }

        .description-block :global(h1) {
            font-size: var(--text-xl);
        }

        .description-block :global(h2) {
            font-size: var(--text-lg);
        }

        .description-block :global(h3) {
            font-size: var(--text-md);
        }
    }

    @media (max-width: 480px) {
        .description-block {
            padding: 0 var(--space-vertical-sm);
        }
    }
</style>
