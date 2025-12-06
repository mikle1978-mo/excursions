<!-- src\routes\(app)\+layout.svelte -->

<script>
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
    import WhatsApp from "$lib/components/UI/buttons/WhatsApp.svelte";

    export let data;

    const { lang, type } = data;
</script>

<div class="container">
    <div class="page">
        <TheHeader {lang} type={type ?? ""} />
        <slot />
        <WhatsApp />
        <TheMobileMenu />
    </div>
</div>
