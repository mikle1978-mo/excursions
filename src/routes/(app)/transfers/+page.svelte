<script>
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";
    import { transfers_SEO_TEXT } from "$lib/i18n/SEO_TEXTS.js";
    export let data;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;
</script>

<ServiceListPage
    {data}
    seoText={transfers_SEO_TEXT}
    {baseUrl}
    {baseName}
    urlPath="transfers"
    type="transfers"
/>
