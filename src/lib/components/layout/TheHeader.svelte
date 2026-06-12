<script>
    import TheLogo from "$lib/components/layout/TheLogo.svelte";
    import TheBurger from "$lib/components/ui/buttons/TheBurger.svelte";

    export let lang;
</script>

<header class="header">
    <div class="header_row">
        <TheLogo {lang} />
        <div class="line_right">
            <TheBurger {lang} />
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
