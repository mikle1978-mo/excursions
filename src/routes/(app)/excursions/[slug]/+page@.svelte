<script>
    import ProductDetailPage from "$lib/components/pages/ProductDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { excursion_page } from "$lib/i18n/excursion_page.js";

    export let data; // данные из load функции
    const { item, reviewsCount, rating } = data;
</script>

<ProductDetailPage
    type="excursion"
    {item}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={excursion_page}
/>
