<script>
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";
    export let data;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: "Аренда авто в Кемере — выгодно и удобно",
            description:
                "Прокат автомобилей в Кемере без залога. Новые машины, полный бак, кондиционер. Быстрая подача, оформление за 5 минут. Комфортные авто на любой вкус и бюджет — седаны, внедорожники, кабриолеты. Забронируйте прямо сейчас!",
            keywords:
                "аренда авто Кемер, прокат машин Кемер, аренда автомобилей Кемер, авто без залога Кемер, прокат авто недорого Кемер, аренда кабриолета Кемер, аренда внедорожника Кемер",
        },
        en: {
            title: "Car Rental in Kemer — Fast & Affordable",
            description:
                "Rent a car in Kemer without deposit. Clean vehicles with A/C and full tank. Fast delivery, 5-minute paperwork. Wide range: sedans, SUVs, convertibles. Affordable rates and reliable service. Book your car in Kemer today!",
            keywords:
                "car rental Kemer, rent a car Kemer, hire a car Kemer, car hire Kemer, cheap car rental Kemer, SUV rental Kemer, convertible rental Kemer",
        },
        tr: {
            title: "Kemer'de Araç Kiralama — Hızlı ve Uygun Fiyatlı",
            description:
                "Kemer'de depozitosuz araç kiralama. Temiz, klimalı araçlar tam depo ile teslim. Hızlı teslimat, 5 dakikada sözleşme. Sedan, SUV, cabrio seçenekleriyle geniş filo. Kemer’de hemen araç kiralayın!",
            keywords:
                "Kemer araç kiralama, Kemer araba kiralama, ucuz araç kiralama Kemer, SUV kiralama Kemer, cabrio kiralama Kemer, araç kiralama ofisi Kemer",
        },
    };
</script>

<ServiceListPage
    {data}
    seoText={SEO_TEXT}
    {baseUrl}
    {baseName}
    urlPath="cars"
    type="cars"
/>
