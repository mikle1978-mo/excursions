<script>
    export let items = [];
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
    {#each items as item, index}
        {#if item.href}
            <a href={item.href}>{item.label}</a>
        {:else}
            <span aria-current="page">{item.label}</span>
        {/if}

        {#if index < items.length - 1}
            <span class="separator"> /&nbsp; </span>
        {/if}
    {/each}
</nav>

<style>
    .breadcrumbs {
        /* position: absolute; */
        width: 100%;
        top: 0;
        font-size: var(--text-sm);
        padding: var(--space-vertical-xs) 0;
        color: var(--color-gray-600);
        background-color: var(--color-bg);
        z-index: 1;

        a {
            color: var(--color-primary);
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
