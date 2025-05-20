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
        font-size: var(--text-sm);
        padding-top: var(--text-sm);
        color: var(--color-gray-600);

        a {
            color: var(--color-primary);
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>
