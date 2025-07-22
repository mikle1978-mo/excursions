<script>
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";

    export let data;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: `Экскурсии и туры в Кемере`,
            description: `Экскурсии и туры в Кемере  — проверенные маршруты, опытные гиды и насыщенные программы. Откройте для себя красивые пляжи Кемера, горы и исторические достопримечательности с надёжными организаторами. Онлайн-бронирование без предоплаты и гарантии качества.`,
            keywords:
                "экскурсии в Кемере, туры в Кемере, гиды Кемер, экскурсии, туры, отдых в Кемере, путешествия в Кемере",
        },
        en: {
            title: `Excursions and Tours in Kemer`,
            description: `Excursions and tours in Kemer  — trusted routes, experienced guides, and rich programs. Discover Kemer’s beautiful beaches, mountains, and historic landmarks with reliable organizers. Online booking with no prepayment and quality guarantees.`,
            keywords:
                "excursions in Kemer, tours in Kemer, Kemer guides, excursions, tours, vacation in Kemer, travel in Kemer",
        },
        tr: {
            title: `Kemer'de Turlar ve Geziler `,
            description: `Kemer'de turlar ve geziler — güvenilir rotalar, deneyimli rehberler ve zengin programlar. Kemer'in güzel plajlarını, dağlarını ve tarihi mekanlarını güvenilir organizatörlerle keşfedin. Ön ödeme olmadan çevrimiçi rezervasyon ve kalite garantisi.`,
            keywords:
                "Kemer turları, Kemer gezileri, Kemer rehberleri, turlar, geziler, Kemer tatili, Kemer seyahati",
        },
    };
</script>

<ServiceListPage
    {data}
    seoText={SEO_TEXT}
    {baseUrl}
    {baseName}
    urlPath="excursions"
    type="excursions"
/>
