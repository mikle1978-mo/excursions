<script>
    import BuyMeACoffe from "$lib/components/ui/buttons/BuyMeACoffe.svelte";
    // export let data;
    export let system;

    const lang = system.lang;
</script>

<div class="coffe-content">
    <BuyMeACoffe locale={lang} />
</div>

<style>
    .coffe-content {
        align-self: stretch;
        background: var(--color-bg);
        padding: var(--space-vertical-sm);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-gray-300);
    }
</style>
