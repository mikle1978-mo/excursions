<script>
    export let title = "";
    export let items = [];
</script>

{#if items.length > 0}
    <div class="info-block">
        <h2>{title}:</h2>
        <ul class="info-list">
            {#each items as item}
                <li>{item}</li>
            {/each}
        </ul>
    </div>
{/if}

<style>
    .info-block {
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

    .info-list {
        list-style: disc inside;
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
    }
</style>
