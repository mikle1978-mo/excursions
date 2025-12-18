<script>
    import BuyMeACoffe from "$lib/components/ui/buttons/BuyMeACoffe.svelte";
    // export let data;
    export let system;

    const lang = system.lang;
</script>

<div style="padding: var(--space-vertical-sm);">
    <BuyMeACoffe locale={lang} />
</div>
