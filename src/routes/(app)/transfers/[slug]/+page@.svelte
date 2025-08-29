<script>
    import ProductDetailPage from "$lib/components/pages/ProductDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { transfer_page } from "$lib/i18n/transfer_page.js";

    export let data; // данные из load функции
    const { item, reviewsCount, rating } = data;
</script>

<ProductDetailPage
    type="transfer"
    {item}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={transfer_page}
/>
