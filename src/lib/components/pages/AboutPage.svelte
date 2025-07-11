<script>
    import { locale } from "$lib/stores/locale";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Galery from "../layout/Galery.svelte";

    const images = [
        { url: "/images/about/about1.webp" },
        { url: "/images/about/about2.webp" },
        { url: "/images/about/about3.webp" },
        { url: "/images/about/about4.webp" },
        { url: "/images/about/about5.webp" },
    ];

    const content = {
        ru: {
            title: "О нас",
            intro: "Мы — команда, живущая в Турции и помогающая туристам находить лучшие предложения в Кемере и окрестностях.",
            paragraph1:
                "Мы не проводим экскурсии сами, а подбираем самые интересные, удобные и безопасные варианты от проверенных организаторов. Также помогаем с арендой авто, трансферами, яхтами и жильём.",
            highlighted:
                "💳 Оплата — только перед началом экскурсии и напрямую организатору. Мы ничего не берём заранее — никаких рисков, никаких предоплат.",
            whyTitle: "Почему выбирают нас",
            reasons: [
                "✔ Без предоплаты и переплат",
                "✔ Проверенные партнёры и маршруты",
                "✔ Быстрый отклик в WhatsApp и Telegram",
                "✔ Говорим по-русски и на месте в Кемере",
            ],
            quote: "Мы живём в Кемере и знаем, где действительно стоит побывать. Рекомендуем только то, что действительно стоит посмотреть.",
            paragraph2:
                "Мы всегда на связи до, во время и после поездки. Поможем, подскажем, подберём лучшее.",
        },
        en: {
            title: "About us",
            intro: "We’re a local team based in Turkey helping travelers find the best experiences in Kemer and beyond.",
            paragraph1:
                "We don’t run tours ourselves — instead, we carefully select the most interesting, convenient, and safe options from trusted organizers. We also help with car rentals, transfers, yachts, and accommodation.",
            highlighted:
                "💳 You pay directly to the organizer, right before the excursion. No prepayment, no risk, no upfront charges.",
            whyTitle: "Why choose us",
            reasons: [
                "✔ No prepayment or extra fees",
                "✔ Trusted partners and routes",
                "✔ Fast response via WhatsApp and Telegram",
                "✔ Russian-speaking and locally based in Kemer",
            ],
            quote: "We live in Kemer and know where it’s truly worth going. We only recommend what’s genuinely worth seeing.",
            paragraph2:
                "We’re available before, during, and after your trip — to help, advise, and find the best for you.",
        },
        tr: {
            title: "Hakkımızda",
            intro: "Türkiye'de yaşayan bir ekip olarak Kemer ve çevresinde en iyi deneyimleri bulmanıza yardımcı oluyoruz.",
            paragraph1:
                "Turları kendimiz düzenlemiyoruz — bunun yerine güvenilir organizatörlerden en ilginç, konforlu ve güvenli seçenekleri özenle seçiyoruz. Ayrıca araç kiralama, transfer, yat ve konaklama konusunda da yardımcı oluyoruz.",
            highlighted:
                "💳 Ödeme doğrudan turdan hemen önce organizatöre yapılır. Ön ödeme yok, risk yok, ek ücret yok.",
            whyTitle: "Neden bizi seçmelisiniz",
            reasons: [
                "✔ Ön ödeme ve gizli ücret yok",
                "✔ Güvenilir partnerler ve güzergahlar",
                "✔ WhatsApp ve Telegram'dan hızlı yanıt",
                "✔ Kemer'de yaşayan, Rusça konuşan ekip",
            ],
            quote: "Kemer'de yaşıyoruz ve gerçekten görülmeye değer yerleri biliyoruz. Sadece gerçekten değerli yerleri öneriyoruz.",
            paragraph2:
                "Seyahatinizden önce, sırasında ve sonrasında her zaman ulaşılabiliriz — yardımcı oluruz, öneririz, en iyisini buluruz.",
        },
    };

    const t = content[$locale] || content["en"];
</script>

<div class="content">
    <main class="about_page">
        <Galery {images} title={t.title} />

        <h1 class="title">{t.title}</h1>
        <p class="text intro">{t.intro}</p>
        <p class="text">{t.paragraph1}</p>
        <p class="highlight">{t.highlighted}</p>
        <h2 class="subtitle">{t.whyTitle}</h2>
        <ul class="reasons">
            {#each t.reasons as reason}
                <li>✅ {reason}</li>
            {/each}
        </ul>
        <blockquote class="quote">“{t.quote}”</blockquote>
        <p class="text">{t.paragraph2}</p>
    </main>
</div>

<style>
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-bottom: 1px solid var(--color-gray-500);
    }

    .about_page {
        position: relative;
        display: flex;
        flex-direction: column;
        max-width: var(--max-width-container);
        margin: 0 auto;
        padding: 0;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-bottom: 1px solid var(--color-gray-500);
    }

    .title {
        font-size: var(--text-xl);
        color: var(--color-text);
        text-align: center;
    }

    .subtitle {
        font-size: var(--text-lg);

        font-weight: 600;
    }

    .text {
        font-size: var(--text-md);
        line-height: 1.6;
    }

    .highlight {
        font-weight: 600;
        color: var(--color-primary);
        background-color: #eef6ff;
        padding: var(--space-vertical-md);
        border-radius: var(--radius-md);
    }

    .quote {
        font-style: italic;
        color: #555;
        padding-left: 1rem;
        border-left: 3px solid var(--color-primary);
    }

    .reasons {
        list-style: none;
        padding-left: 0;
    }

    .reasons li {
        margin-bottom: 0.5rem;
        font-size: var(--text-md);
    }
</style>
