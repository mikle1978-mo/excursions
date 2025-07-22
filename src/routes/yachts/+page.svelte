<script>
    import ServiceListPage from "$lib/components/pages/ServiceListPage.svelte";
    export let data;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: "Аренда яхт в Кемере — прогулки и морские туры",
            description:
                "Аренда яхт в Кемере с капитаном. Морские прогулки, рыбалка, индивидуальные туры по красивейшим бухтам Кемера. Комфортабельные яхты и честные цены без посредников.",
            keywords:
                "аренда яхт Кемер, яхты в Кемере, морская прогулка Кемер, аренда лодки Кемер, яхта с капитаном Кемер, прогулка на яхте Кемер, частная яхта Кемер",
        },
        en: {
            title: "Yacht Rental in Kemer — Private Cruises & Boat Tours",
            description:
                "Yacht rental in Kemer with skipper. Private cruises, fishing, and scenic boat tours to Kemer’s bays. Comfortable yachts at fair prices without intermediaries.",
            keywords:
                "yacht rental Kemer, boat trip Kemer, private yacht Kemer, Kemer yacht tour, boat hire Kemer, sailing Kemer, rent a yacht Kemer",
        },
        tr: {
            title: "Kemer'de Yat Kiralama — Özel Tekne Turları",
            description:
                "Kemer'de kaptanlı yat kiralama. Özel turlar, balıkçılık, koylara deniz gezileri. Konforlu yatlar, aracısız ve uygun fiyatlarla.",
            keywords:
                "Kemer yat kiralama, Kemer tekne turu, özel yat Kemer, Kemer tekne kiralama, yat gezisi Kemer, kaptanlı yat Kemer, Kemer'de tekne",
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
