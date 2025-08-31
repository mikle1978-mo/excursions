<script>
    import ProductDetailPage from "$lib/components/blocks/ProductDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { yacht_page } from "$lib/i18n/yacht_page.js";

    export let data; // данные из load функции
    const { item, reviewsCount, rating } = data;
</script>

<ProductDetailPage
    type="yacht"
    {item}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={yacht_page}
/>
