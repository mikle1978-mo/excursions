<script>
    import TheLogo from "./TheLogo.svelte";
    import Search from "$lib/components/UI/inputs/search/Search.svelte";
    import FilterButton from "../UI/buttons/FilterButton.svelte";
    import TheBurger from "../UI/buttons/TheBurger.svelte";
    import { appConfig } from "$lib/config/app.config.js";

    // export let lang;
    export let type = "";

    const config = appConfig.layout.header;
</script>

<header class="header">
    <div class="header_row">
        <TheLogo />

        {#if config.showSearchOn.includes(type)}
            <Search />
        {/if}

        <div class="line_right">
            {#if config.showFilterOn.includes(type)}
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
