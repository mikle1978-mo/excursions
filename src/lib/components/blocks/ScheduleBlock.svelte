<script>
    export let title = "Расписание";
    export let items = []; // массив строк
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

        <ul class="timeline">
            {#each items as item}
                <li class="timeline-item">{item}</li>
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

    .title-with-icon {
        display: flex;
        gap: var(--space-vertical-sm);
        align-items: center;
        font-size: var(--text-lg);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }

    /* timeline */
    .timeline {
        list-style: none;
        margin: 0;
        padding: 0 0 0 var(--space-vertical-sm);
        border-left: 2px solid var(--color-gray-300);
    }

    .timeline-item {
        position: relative;
        margin: 0 0 var(--space-vertical-md) var(--space-vertical-sm);
        padding-left: var(--space-vertical-md);
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
    }

    .timeline-item::before {
        content: "";
        position: absolute;
        left: calc(-1 * var(--space-vertical-sm) - 6px);
        top: 0.4rem;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--color-primary, #0070f3);
    }

    @media (prefers-color-scheme: dark) {
        .timeline {
            border-color: var(--color-gray-600);
        }
        .timeline-item {
            color: var(--color-gray-300);
        }
    }
</style>
