<script>
    import ProductDetailPage from "$lib/components/pages/ProductDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { yacht_page } from "$lib/i18n/yacht_page.js";

    export let data; // данные из load функции
    const { yacht, reviewsCount, rating } = data;
</script>

<ProductDetailPage
    type="yacht"
    item={yacht}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={yacht_page}
/>
