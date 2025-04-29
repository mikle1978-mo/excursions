<script>
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheHeader from "$lib/components/layout/TheHeader.svelte";

    let { children } = $props();
</script>

<div class="container">
    <div class="page">
        <TheHeader />
        {@render children()}
        <TheFooter />
    </div>
</div>
