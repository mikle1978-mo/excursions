<!-- src\routes\(app)\+layout.svelte -->

<script>
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
    import WhatsApp from "$lib/components/ui/buttons/WhatsApp.svelte";
</script>

<div class="container">
    <div class="page">
        <!-- <TheHeader /> -->
        <slot />
        <WhatsApp />
        <TheMobileMenu />
    </div>
</div>
