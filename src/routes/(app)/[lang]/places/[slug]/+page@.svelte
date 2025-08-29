<script>
    import ProductDetailPage from "$lib/components/pages/ProductDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { place_page } from "$lib/i18n/place_page.js";

    export let data; // данные из load функции
    const { place, reviewsCount, rating } = data;
</script>

<ProductDetailPage
    type="place"
    item={place}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={place_page}
/>
