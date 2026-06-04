<!-- src\routes\(app)\+layout.svelte -->

<script>
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
    import WhatsApp from "$lib/components/ui/buttons/WhatsApp.svelte";

    export let data;

    const { lang } = data;
</script>

<div class="container">
    <div class="page">
        <TheHeader {lang} />
        <slot />
        <WhatsApp />
        <TheMobileMenu {lang} />
    </div>
</div>
