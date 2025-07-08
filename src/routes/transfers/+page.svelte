<script>
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";
    export let data;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    // SEO

    const SEO_TEXT = {
        ru: {
            title: "Трансфер из аэропорта Анталии до Кемера и обратно",
            description:
                "Быстрый и комфортный трансфер из аэропорта Анталии в Кемер и обратно. Индивидуальные поездки, новые автомобили, профессиональные водители.",
            keywords:
                "трансфер Анталия Кемер, такси Анталия Кемер, трансфер из аэропорта Анталии, индивидуальный трансфер в Кемер",
            twitter:
                "Индивидуальный трансфер из аэропорта Анталии в Кемер. Комфорт, безопасность и доступные цены.",
        },
        en: {
            title: "Transfer from Antalya Airport to Kemer and back",
            description:
                "Fast and comfortable transfer from Antalya Airport to Kemer and back. Private rides, modern cars, professional drivers.",
            keywords:
                "Antalya Kemer transfer, taxi Antalya Kemer, Antalya airport transfer, private transfer to Kemer",
            twitter:
                "Private transfer from Antalya Airport to Kemer. Comfort, safety and affordable prices.",
        },
        tr: {
            title: "Antalya Havalimanı'ndan Kemer'e ve geri transfer",
            description:
                "Antalya Havalimanı'ndan Kemer'e ve geri hızlı ve konforlu transfer. Özel araçlar, modern filolar, profesyonel şoförler.",
            keywords:
                "Antalya Kemer transfer, Antalya havalimanı transfer, Kemer özel transfer, Antalya Kemer taksi",
            twitter:
                "Antalya Havalimanı'ndan Kemer'e özel transfer. Konforlu ve güvenli yolculuklar.",
        },
    };

    // Обработчики
</script>

<ServiceListPage
    {data}
    seoText={SEO_TEXT}
    {baseUrl}
    {baseName}
    urlPath="transfers"
    type="transfers"
/>
