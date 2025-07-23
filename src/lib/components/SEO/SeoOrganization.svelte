<script>
    import { locale } from "$lib/stores/locale";
    export let name = "Kemer.app";
    export let url = "https://kemer.app";
    export let logo = "https://kemer.app/icon-192.png";
    export let sameAs = [
        "https://t.me/MikleGromov",
        "https://www.instagram.com/kemer.app",
        "https://wa.me/905356062642",
        "https://www.facebook.com/profile.php?id=61578033954306",
    ];

    const descriptions = {
        ru: "Все, что нужно для комфортного и незабываемого отдыха в Кемере: экскурсии, аренда яхт и автомобилей, трансферы и недвижимость. Удобное бронирование, отзывы и поддержка на нескольких языках.",
        en: "Everything you need for a comfortable and unforgettable vacation in Kemer: excursions, yacht and car rentals, transfers, and real estate. Easy booking, reviews, and multilingual support.",
        tr: "Kemer'de konforlu ve unutulmaz bir tatil için ihtiyacınız olan her şey: turlar, yat ve araç kiralama, transferler ve emlak. Kolay rezervasyon, yorumlar ve çok dilli destek.",
    };

    const description = descriptions[locale] || descriptions.ru;

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        url,
        logo,
        sameAs,
        description,
        contactPoint: {
            "@type": "ContactPoint",
            telephone: "+90-535-606-26-42",
            contactType: "customer service",
            availableLanguage: ["Russian", "English", "Turkish"],
            areaServed: "TR",
        },
    };
</script>

{@html `<script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>`}
