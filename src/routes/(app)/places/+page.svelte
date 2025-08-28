<script>
    import PlacesListPage from "$lib/components/pages/PlacesListPage.svelte";
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";
    import { excursions_SEO_TEXT } from "$lib/i18n/SEO_TEXTS.js";

    export let data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
</script>

<PlacesListPage
    {data}
    seoText={excursions_SEO_TEXT}
    {baseUrl}
    {baseName}
    urlPath="places"
    type="places"
/>
