<script>
    import TheLogo from "./TheLogo.svelte";
    import Search from "$lib/components/UI/inputs/search/Search.svelte";
    import CurrensySelector from "$lib/components/UI/buttons/CurrensySelector.svelte";
    import TheLocaleButton from "$lib/components/UI/buttons/TheLocaleButton.svelte";
    import { page } from "$app/stores";
    import FilterButton from "../UI/buttons/FilterButton.svelte";
    import TheBurger from "../UI/buttons/TheBurger.svelte";
    const showSearchOn = ["/excursions", "/yachts", "/cars"];
</script>

<header class="header">
    <div class="header_row">
        <TheLogo />
        {#if showSearchOn.some((p) => $page.url.pathname.includes(p))}
            <Search />
        {/if}
        <div class="line_right">
            {#if showSearchOn.some((p) => $page.url.pathname.includes(p))}
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
