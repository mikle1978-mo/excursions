<script>
    export let system;

    const lang = system.lang;

    const content = {
        ru: {
            title: "О нас",
            paragraph1:
                "Мы — команда, помогающая туристам находить лучшие предложения в Кемере. ✔ Без переплат, ✔ без комиссий. Работаем напрямую с компаниями, подбираем экскурсии, аренду яхт, авто, трансферы и жильё.",
            highlighted:
                "💳 Оплата — только перед началом экскурсии и напрямую организатору. Мы ничего не берем заранее — никаких рисков, никаких предоплат.",

            quote: "Мы живём в Кемере и знаем, где действительно стоит побывать. Рекомендуем только то, что действительно стоит посмотреть.",
            paragraph2:
                "Всегда на связи до, во время и после поездки — поможем, подскажем, подберём лучшее.",
            link: "подробнее о нас...",
        },
        en: {
            title: "About us",
            paragraph1:
                "We’re a team helping travelers find the best options in Kemer. ✔ No extra fees, ✔ no commission. We work directly with trusted companies to offer tours, yacht and car rentals, transfers, and accommodations.",
            highlighted:
                "💳 You pay directly to the organizer, just before the tour starts. No prepayment, no risk, no extra charges.",

            quote: "We live in Kemer and know where it’s truly worth going. We recommend only what’s genuinely worth seeing.",
            paragraph2:
                "We’re always available — before, during, and after your trip — to help, advise, and find the best for you.",
            link: "learn more about us...",
        },
        tr: {
            title: "Hakkımızda",
            paragraph1:
                "Kemer'de en iyi seçenekleri bulmanıza yardımcı olan bir ekibiz. ✔ Komisyonsuz, ✔ ek ücret yok. Güvenilir şirketlerle doğrudan çalışıyoruz: turlar, yat kiralama, araç, transfer ve konaklama hizmetleri sunuyoruz.",
            highlighted:
                "💳 Ödemeyi doğrudan turu düzenleyen kişiye, tur başlamadan hemen önce yaparsınız. Ön ödeme yok, risk yok, peşin ödeme yok.",

            quote: "Kemer'de yaşıyoruz ve gerçekten gidilmeye değer yerleri biliyoruz. Sadece gerçekten görülmeye değer yerleri öneriyoruz.",
            paragraph2:
                "Seyahatinizden önce, sırasında ve sonrasında her zaman ulaşılabiliriz — yardımcı oluruz, öneririz, en iyisini buluruz.",
            link: "hakkımızda daha fazla bilgi...",
        },
    };

    const t = content[lang] || content["en"];
</script>

<section class="about-service">
    <h2 class="title">{t.title}</h2>
    <p class="text">{t.paragraph1}</p>
    <p class="highlight">{t.highlighted}</p>
    <blockquote class="quote">“{t.quote}”</blockquote>
    <p class="text">{t.paragraph2}</p>
    <div class="license">
        <img alt="license" src="/images/other/license.webp" />
    </div>
    <a href={`/${lang}/about`} class="read-more">{t.link}</a>
</section>

<style>
    .about-service {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
        background: var(--color-bg);
        border-radius: var(--radius-md);
        padding: var(--space-vertical-md);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    .title {
        font-size: var(--text-lg);
        color: var(--color-text);
    }

    .text {
        font-size: var(--text-md);
        line-height: 1.6;
    }
    .highlight {
        font-weight: 600;
        color: var(--color-primary);
        background-color: #eef6ff;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }

    .quote {
        font-style: italic;
        color: #555;
        padding-left: 1rem;
        border-left: 3px solid var(--color-primary);
    }
    .read-more {
        display: inline-block;
        color: var(--color-primary);
        text-decoration: underline;
        font-size: var(--text-sm);
        transition: color 0.2s;
    }

    .read-more:hover {
        color: var(--color-primary-dark);
    }
    @media (prefers-color-scheme: dark) {
        .highlight {
            background-color: rgba(
                74,
                201,
                126,
                0.15
            ); /* 15% прозрачности от --color-primary */
            color: var(--color-primary);
            border-left: 2px solid var(--color-primary);
            padding: 0.5rem 1rem;
            border-radius: var(--radius-sm);
        }
    }
    @media (max-width: 480px) {
        .about-service {
            margin: 0 var(--space-vertical-sm);
        }
    }
</style>
