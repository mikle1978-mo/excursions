<script>
    import { locale } from "$lib/stores/locale";

    const content = {
        ru: {
            title: "О нас",
            paragraph1:
                "Мы — команда, помогающая туристам находить лучшие предложения в Кемере. ✔ Без переплат, без комиссий. Работаем напрямую с компаниями, подбираем экскурсии, аренду яхт, авто, трансферы и жильё.",
            highlighted:
                "💳 Оплата — только перед началом экскурсии и напрямую организатору. Мы ничего не берем заранее — никаких рисков, никаких предоплат.",

            quote: "Мы живём в Кемере и знаем, где действительно стоит побывать. Рекомендуем только то, что действительно стоит посмотреть.",
            paragraph2:
                "Всегда на связи до, во время и после поездки — поможем, подскажем, подберём лучшее.",
        },
        en: {
            title: "About us",
            paragraph1:
                "We’re a team helping travelers find the best options in Kemer. ✔ No extra fees, no commission. We work directly with trusted companies to offer tours, yacht and car rentals, transfers, and accommodations.",
            highlighted:
                "💳 You pay directly to the organizer, just before the tour starts. No prepayment, no risk, no extra charges.",

            quote: "We live in Kemer and know where it’s truly worth going. We recommend only what’s genuinely worth seeing.",
            paragraph2:
                "We’re always available — before, during, and after your trip — to help, advise, and find the best for you.",
        },
        tr: {
            title: "Hakkımızda",
            paragraph1:
                "Kemer'de en iyi seçenekleri bulmanıza yardımcı olan bir ekibiz. ✔ Komisyonsuz, ek ücret yok. Güvenilir şirketlerle doğrudan çalışıyoruz: turlar, yat kiralama, araç, transfer ve konaklama hizmetleri sunuyoruz.",
            highlighted:
                "💳 Ödemeyi doğrudan turu düzenleyen kişiye, tur başlamadan hemen önce yaparsınız. Ön ödeme yok, risk yok, peşin ödeme yok.",

            quote: "Kemer'de yaşıyoruz ve gerçekten gidilmeye değer yerleri biliyoruz. Sadece gerçekten görülmeye değer yerleri öneriyoruz.",
            paragraph2:
                "Seyahatinizden önce, sırasında ve sonrasında her zaman ulaşılabiliriz — yardımcı oluruz, öneririz, en iyisini buluruz.",
        },
    };

    const t = content[$locale] || content["en"];
</script>

<section class="about-service">
    <h2 class="title">{t.title}</h2>
    <p class="text">{t.paragraph1}</p>
    <p class="highlight">{t.highlighted}</p>
    <blockquote class="quote">“{t.quote}”</blockquote>
    <p class="text">{t.paragraph2}</p>
    <a href="/{$locale !== 'en' ? $locale + '/' : ''}about" class="read-more"
        >Подробнее о нас →</a
    >
</section>

<style>
    .about-service {
        background: var(--color-bg);
        border-radius: 1rem;
        padding: 1.5rem;
        margin-top: 2rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    .title {
        font-size: var(--text-lg);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }

    .text {
        font-size: var(--text-md);
        line-height: 1.6;
        margin-bottom: 1rem;
    }
    .highlight {
        font-weight: 600;
        color: var(--color-primary);
        background-color: #eef6ff;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }

    .quote {
        font-style: italic;
        color: #555;
        padding-left: 1rem;
        border-left: 3px solid var(--color-primary);
        margin: 1rem 0;
    }
    .read-more {
        display: inline-block;
        margin-top: 0.5rem;
        color: var(--color-primary);
        text-decoration: underline;
        font-size: var(--text-sm);
        transition: color 0.2s;
    }

    .read-more:hover {
        color: var(--color-primary-dark);
    }
</style>
