<script>
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";
    export let data;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: "Аренда яхт и морские прогулки в Кемере",
            description:
                "Аренда яхт и прогулки по морю в Кемере. Частные туры, комфортабельные яхты, живописные бухты и прозрачное море.",
            keywords:
                "аренда яхты Кемер, морские прогулки Кемер, яхт туры, Кемер Турция, яхта на прокат, туры на яхте",
            twitter:
                "Аренда яхты в Кемере с капитаном. Уникальные морские прогулки и живописные маршруты.",
        },
        en: {
            title: "Yacht Rental and Sea Trips in Kemer",
            description:
                "Yacht rental and sea excursions in Kemer. Private tours, comfortable yachts, scenic bays and crystal-clear sea.",
            keywords:
                "yacht rental Kemer, sea trips Kemer, yacht tours, Kemer Turkey, private boat, yacht charter",
            twitter:
                "Charter a yacht in Kemer for unforgettable sea trips. Private routes and full comfort.",
        },
        tr: {
            title: "Kemer'de Yat Kiralama ve Deniz Turları",
            description:
                "Kemer'de yat kiralama ve deniz gezileri. Özel turlar, konforlu yatlar, berrak deniz ve eşsiz koylar.",
            keywords:
                "Kemer yat kiralama, deniz turu Kemer, yat turları, Kemer Türkiye, özel tekne, yat turu",
            twitter:
                "Kemer'de özel yat kiralama. Unutulmaz deniz gezileri ve konforlu rotalar sizi bekliyor.",
        },
    };
</script>

<ServiceListPage
    {data}
    seoText={SEO_TEXT}
    {baseUrl}
    {baseName}
    urlPath="yachts"
    type="yachts"
/>
