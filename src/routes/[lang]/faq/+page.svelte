<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <h1>Faq</h1>
{:else}
    <div></div>
{/if}

<style>
</style>
