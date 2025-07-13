<script>
    import AboutPage from "$lib/components/pages/AboutPage.svelte";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: "О нас — кем мы являемся и зачем мы это делаем",
            description:
                "Мы помогаем туристам находить лучшие экскурсии, трансферы и аренду в Кемере. Без комиссий и предоплат. Работаем напрямую с местными гидами.",
            keywords: "о нас, Кемер, экскурсии, аренда, трансферы, гиды",
            twitter:
                "Почему туристы выбирают нас — честно, прозрачно и без переплат.",
        },
        en: {
            title: "About us — who we are and why we do this",
            description:
                "We help travelers find the best excursions, transfers and rentals in Kemer. No commission, no prepayment. Direct cooperation with locals.",
            keywords: "about us, Kemer, excursions, rental, transfers, guides",
            twitter:
                "Why travelers choose us — honest, transparent, no extra fees.",
        },
        tr: {
            title: "Hakkımızda — kimiz ve neden bunu yapıyoruz",
            description:
                "Kemer'de en iyi turları, transferleri ve kiralama hizmetlerini bulmanıza yardımcı oluyoruz. Komisyonsuz, ön ödemesiz. Yerel ortaklarla çalışıyoruz.",
            keywords:
                "hakkımızda, Kemer, turlar, kiralama, transfer, rehberler",
            twitter: "Neden bizi seçiyorlar? Şeffaf ve güvenilir hizmet.",
        },
    };
</script>

<AboutPage seoText={SEO_TEXT} {baseUrl} {baseName} urlPath="about" />
