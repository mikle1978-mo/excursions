<script>
    import ProductDetailPage from "$lib/components/blocks/ProductDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { car_page } from "$lib/i18n/car_page.js";

    export let data; // данные из load функции
    const { item, reviewsCount, rating } = data;
</script>

<ProductDetailPage
    type="car"
    {item}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={car_page}
/>
