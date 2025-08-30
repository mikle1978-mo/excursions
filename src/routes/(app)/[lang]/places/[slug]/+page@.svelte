<script>
    import PlaceDetailPage from "$lib/components/pages/PlaceDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { excursion_page } from "$lib/i18n/excursion_page.js";

    export let data; // данные из load функции

    console.log("123====================================");
    console.log(data);
    console.log("123====================================");
    const { item, reviewsCount, rating } = data;
    console.log("====================================");
    console.log(item, reviewsCount, rating);
    console.log("====================================");
</script>

<PlaceDetailPage
    type="place"
    {item}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={excursion_page}
/>
