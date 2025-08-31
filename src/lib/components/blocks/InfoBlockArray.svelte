<script>
    export let title = "";
    export let items = [];
    export let icon = null;
</script>

{#if items.length > 0}
    <div class="info-block">
        <h2 class="title-with-icon">
            {#if icon}
                <svelte:component this={icon} class="icon" />
            {/if}
            {title}:
        </h2>
        <ul class="info-list">
            {#each items as item}
                <li>{item}</li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    .info-block {
        width: 100%;
        background: var(--color-bg);
        padding: var(--space-vertical-md);
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
</style>
