<script>
    import PlaceDetailPage from "$lib/components/blocks/PlaceDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { excursion_page } from "$lib/i18n/excursion_page.js";

    export let data; // данные из load функции

    const { item, reviewsCount, rating } = data;
</script>

<PlaceDetailPage
    type="place"
    {item}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={excursion_page}
/>
