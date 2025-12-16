<script>
    export let data;
    export let style = {};

    const text = data.text;
    const title = data.title;
    const icon = data.icon;
</script>

{#if text}
    <div class="info-block">
        {#if title}
            <h2 class="title-with-icon" data-variant={style.variant}>
                {#if icon}
                    <svelte:component this={icon} class="icon" />
                {/if}
                {title}
            </h2>{/if}
        <div class="text-block">
            {text}
        </div>
    </div>
{/if}

<style>
    .info-block {
        width: 100%;
        background: var(--color-bg);
        padding: var(--space-vertical-sm);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-gray-300);
    }
    .info-block h2 {
        font-size: var(--text-lg);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }
    .title-with-icon {
        display: flex;
        gap: var(--space-vertical-sm);
        justify-content: flex-start;
        align-items: center;
    }
    .text-block {
        color: var(--color-gray-700);
        line-height: 1.6;
        padding: 0;
    }

    /* Стили для всего HTML контента внутри блока */
    .text-block :global(p) {
        margin-bottom: var(--space-vertical-sm);
        font-size: var(--text-md);
        line-height: 1.6;
    }

    .text-block :global(p:first-letter) {
        color: var(--color-primary);
        font-weight: 700;
    }

    .text-block :global(strong) {
        color: var(--color-accent);
        font-weight: 700;
    }

    .text-block :global(em) {
        font-style: italic;
    }

    .text-block :global(u) {
        text-decoration: underline;
    }

    .text-block :global(a) {
        color: var(--color-primary);
        text-decoration: none;
    }

    .text-block :global(a:hover) {
        text-decoration: underline;
    }

    .text-block :global(ul) {
        padding-left: 1.5em;
        list-style: disc;
        margin: 0.5em 0;
    }

    .text-block :global(ol) {
        padding-left: 1.5em;
        margin: 0.5em 0;
    }

    .text-block :global(li) {
        margin-bottom: 0.3em;
        line-height: 1.5;
    }

    .text-block :global(h1) {
        font-size: var(--text-xxl);
        font-weight: 700;
        margin: 1em 0 0.5em 0;
    }

    .text-block :global(h2) {
        font-size: var(--text-xl);
        font-weight: 600;
        margin: 0.8em 0 0.4em 0;
    }

    .text-block :global(h3) {
        font-size: var(--text-lg);
        font-weight: 600;
        margin: 0.6em 0 0.3em 0;
    }

    .text-block :global(blockquote) {
        border-left: 4px solid var(--color-primary);
        padding-left: 1em;
        margin: 1em 0;
        font-style: italic;
    }

    /* Темная тема */
    @media (prefers-color-scheme: dark) {
        .text-block {
            color: var(--color-gray-300);
        }

        .text-block :global(.dropcap) {
            color: var(--color-primary);
        }

        .text-block :global(strong) {
            color: var(--color-accent);
        }
    }

    /* Адаптивность */
    @media (max-width: 768px) {
        .text-block :global(p) {
            font-size: var(--text-sm);
            line-height: 1.5;
        }

        .text-block :global(.dropcap) {
            font-size: 2.5em;
        }

        .text-block :global(h1) {
            font-size: var(--text-xl);
        }

        .text-block :global(h2) {
            font-size: var(--text-lg);
        }

        .text-block :global(h3) {
            font-size: var(--text-md);
        }
    }

    @media (max-width: 480px) {
        .text-block {
            padding: 0;
        }
    }
</style>
