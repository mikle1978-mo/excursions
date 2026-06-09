<!-- src\routes\(app)\[lang]\+layout.svelte -->

<script>
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
    import WhatsApp from "$lib/components/ui/buttons/WhatsApp.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    export let data;

    const { lang } = data;
    console.log("Layout data:", data);
</script>

<svelte:head>
    <link rel="alternate" hreflang="ru" href="{baseUrl}/ru{data.pathname}" />
    <link rel="alternate" hreflang="en" href="{baseUrl}/en{data.pathname}" />
    <link
        rel="alternate"
        hreflang="x-default"
        href="{baseUrl}/en{data.pathname}"
    />
</svelte:head>

<div class="container">
    <div class="page">
        <TheHeader {lang} />
        <slot />
        <WhatsApp />
        <TheMobileMenu {lang} />
    </div>
</div>
