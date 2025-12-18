<!-- src/lib/components/blocks/ListBlock.svelte -->
<script>
    export let data;
    export let style = {};

    const items = data.items ?? [];
    const title = data.title ?? "";
    const Icon = data.icon ?? null;
</script>

{#if items.length > 0}
    <div class="info-block">
        <h2 class="title-with-icon" data-variant={style.variant}>
            {#if Icon}
                <svelte:component this={Icon} class="icon" />
            {/if}
            {title}
        </h2>

        <ul class="info-list">
            {#each items as row}
                <li>{row}</li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    .info-block {
        align-self: stretch;

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

    .info-list {
        list-style: disc inside;
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
    }

    @media (prefers-color-scheme: dark) {
        .info-list {
            color: var(--color-gray-300);
        }
    }
    @media (max-width: 480px) {
        .info-block {
            margin: 0 var(--space-vertical-sm);
        }
    }
</style>
