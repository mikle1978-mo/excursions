<script>
    import AboutPage from "$lib/components/pages/AboutPage.svelte";
    import { about_SEO_TEXT } from "$lib/i18n/SEO_TEXTS.js";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
</script>

<AboutPage seoText={about_SEO_TEXT} {baseUrl} {baseName} urlPath="about" />
