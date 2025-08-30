<script>
    import PlacesListPage from "$lib/components/pages/PlacesListPage.svelte";
    import { places_SEO_TEXT } from "$lib/i18n/SEO_TEXTS.js";
    export let data;

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
</script>

<PlacesListPage
    {data}
    seoText={places_SEO_TEXT}
    {baseUrl}
    {baseName}
    urlPath="places"
    type="places"
/>
