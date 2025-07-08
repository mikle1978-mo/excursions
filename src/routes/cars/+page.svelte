<script>
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";
    export let data;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: "Аренда автомобилей в Кемере",
            description:
                "Прокат авто в Кемере и окрестностях. Комфортные автомобили, выгодные цены и быстрая подача.",
            keywords:
                "аренда авто Кемер, прокат машин Турция, аренда автомобилей Анталия, авто напрокат Кемер",
            twitter:
                "Аренда авто в Кемере — удобно, быстро и без залога. Онлайн бронирование.",
        },
        en: {
            title: "Car Rental in Kemer",
            description:
                "Rent a car in Kemer and nearby areas. Reliable vehicles, great prices, and fast service.",
            keywords:
                "car rental Kemer, rent a car Turkey, car hire Antalya, car rental near me",
            twitter:
                "Car rental in Kemer — fast, affordable, and hassle-free. Book online now.",
        },
        tr: {
            title: "Kemer'de Araç Kiralama",
            description:
                "Kemer ve çevresinde uygun fiyatlarla konforlu araç kiralama hizmeti.",
            keywords:
                "Kemer araç kiralama, Antalya rent a car, Türkiye'de araba kiralama, uygun fiyatlı araç kiralama",
            twitter:
                "Kemer'de araç kiralama — hızlı, güvenilir ve uygun fiyatlı. Hemen çevrimiçi rezervasyon yapın.",
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
