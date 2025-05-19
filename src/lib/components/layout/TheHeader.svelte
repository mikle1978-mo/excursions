<script>
    import TheLogo from "./TheLogo.svelte";
    import Search from "$lib/components/UI/inputs/search/Search.svelte";
    import CurrensySelector from "$lib/components/UI/buttons/CurrensySelector.svelte";
    import TheLocaleButton from "$lib/components/UI/buttons/TheLocaleButton.svelte";
</script>

<header class="header">
    <div class="header_row">
        <TheLogo />
        <Search />
        <div class="line_right">
            <CurrensySelector />
            <TheLocaleButton />
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
        display: grid;
        grid-template-columns: 1fr 1fr;
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
</style>
