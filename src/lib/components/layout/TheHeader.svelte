<script>
    import TheLogo from "$lib/components/layout/TheLogo.svelte";
    import Search from "$lib/components/ui/inputs/search/Search.svelte";
    import FilterButton from "$lib/components/ui/buttons/FilterButton.svelte";
    import TheBurger from "$lib/components/ui/buttons/TheBurger.svelte";

    export let showSearch = false;
    export let showFilter = false;
</script>

<header class="header">
    <div class="header_row">
        <TheLogo />

        {#if showSearch}
            <Search />
        {/if}

        <div class="line_right">
            {#if showFilter}
                <FilterButton />
            {/if}

            <TheBurger />
        </div>
    </div>
</header>

<style>
    .header {
        height: 100%;
    }

    .header_row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        gap: var(--space-horizontal-md);
    }

    .line_right {
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-md);
        height: 100%;
    }

    @media (max-width: 768px) {
        .header_row {
            gap: var(--space-horizontal-sm);
        }
        .line_right {
            gap: var(--space-horizontal-sm);
        }
    }
    @media (max-width: 480px) {
        .header {
            padding: 0 var(--space-horizontal-sm);
        }
    }
</style>
