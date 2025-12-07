<script>
    import { locale as localeStore } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import Galery from "$lib/components/blocks/GaleryCollage.svelte";
    import PageSeoHead from "$lib/components/SEO/PageSeoHead.svelte";
    import BuyMeACoffe from "$lib/components/UI/buttons/BuyMeACoffe.svelte";

    export let seoText;

    export let baseUrl;
    export let baseName;
    export let urlPath;

    const images = [
        { url: "/images/about/about1.webp" },
        { url: "/images/about/about2.webp" },
        { url: "/images/about/about3.webp" },
        { url: "/images/about/about4.webp" },
        { url: "/images/about/about5.webp" },
    ];

    // const content = {
    //     ru: {
    //         title: "О нас",
    //         intro: "Мы — команда, живущая в Турции и помогающая туристам находить лучшие предложения в Кемере и окрестностях.",
    //         paragraph1:
    //             "Мы не проводим экскурсии сами, а подбираем самые интересные, удобные и безопасные варианты от проверенных организаторов. Также помогаем с арендой авто, трансферами, яхтами и жильём.",
    //         highlighted:
    //             "💳 Оплата — только перед началом экскурсии и напрямую организатору. Мы ничего не берём заранее — никаких рисков, никаких предоплат.",
    //         whyTitle: "Почему выбирают нас",
    //         reasons: [
    //             "✔ Без предоплаты и переплат",
    //             "✔ Проверенные партнёры и маршруты",
    //             "✔ Быстрый отклик в WhatsApp и Telegram",
    //             "✔ Говорим по-русски и на месте в Кемере",
    //         ],
    //         quote: "Мы живём в Кемере и знаем, где действительно стоит побывать. Рекомендуем только то, что действительно стоит посмотреть.",
    //         paragraph2:
    //             "Мы всегда на связи до, во время и после поездки. Поможем, подскажем, подберём лучшее.",
    //     },
    //     en: {
    //         title: "About us",
    //         intro: "We’re a local team based in Turkey helping travelers find the best experiences in Kemer and beyond.",
    //         paragraph1:
    //             "We don’t run tours ourselves — instead, we carefully select the most interesting, convenient, and safe options from trusted organizers. We also help with car rentals, transfers, yachts, and accommodation.",
    //         highlighted:
    //             "💳 You pay directly to the organizer, right before the excursion. No prepayment, no risk, no upfront charges.",
    //         whyTitle: "Why choose us",
    //         reasons: [
    //             "✔ No prepayment or extra fees",
    //             "✔ Trusted partners and routes",
    //             "✔ Fast response via WhatsApp and Telegram",
    //             "✔ Russian-speaking and locally based in Kemer",
    //         ],
    //         quote: "We live in Kemer and know where it’s truly worth going. We only recommend what’s genuinely worth seeing.",
    //         paragraph2:
    //             "We’re available before, during, and after your trip — to help, advise, and find the best for you.",
    //     },
    //     tr: {
    //         title: "Hakkımızda",
    //         intro: "Türkiye'de yaşayan bir ekip olarak Kemer ve çevresinde en iyi deneyimleri bulmanıza yardımcı oluyoruz.",
    //         paragraph1:
    //             "Turları kendimiz düzenlemiyoruz — bunun yerine güvenilir organizatörlerden en ilginç, konforlu ve güvenli seçenekleri özenle seçiyoruz. Ayrıca araç kiralama, transfer, yat ve konaklama konusunda da yardımcı oluyoruz.",
    //         highlighted:
    //             "💳 Ödeme doğrudan turdan hemen önce organizatöre yapılır. Ön ödeme yok, risk yok, ek ücret yok.",
    //         whyTitle: "Neden bizi seçmelisiniz",
    //         reasons: [
    //             "✔ Ön ödeme ve gizli ücret yok",
    //             "✔ Güvenilir partnerler ve güzergahlar",
    //             "✔ WhatsApp ve Telegram'dan hızlı yanıt",
    //             "✔ Kemer'de yaşayan, Rusça konuşan ekip",
    //         ],
    //         quote: "Kemer'de yaşıyoruz ve gerçekten görülmeye değer yerleri biliyoruz. Sadece gerçekten değerli yerleri öneriyoruz.",
    //         paragraph2:
    //             "Seyahatinizden önce, sırasında ve sonrasında her zaman ulaşılabiliriz — yardımcı oluruz, öneririz, en iyisini buluruz.",
    //     },
    // };
    const content = {
        ru: {
            title: "О нас — Kemer.app",
            intro: "Мы — команда Kemer.app, живущая в Турции, и помогаем туристам находить самые интересные и безопасные предложения в Кемере и окрестностях. Через наш сервис вы получаете удобный и надёжный доступ к экскурсиям, трансферам, аренде автомобилей, яхт и жилья — всё от проверенных местных партнёров. Наша цель — сделать ваш отдых комфортным, запоминающимся и полностью безопасным, чтобы вы могли наслаждаться каждой минутой без лишних забот.",
            paragraph1:
                "Мы не проводим экскурсии сами, а выступаем как онлайн-представительство наших партнёров: с помощью Kemer.app вы бронируете услуги напрямую у туристических агентств и организаторов, которым доверяют местные жители и гости города. Каждый маршрут тщательно проверяется, условия изучаются, а отзывы анализируются, чтобы вы могли отдыхать без неожиданностей. Наш подход гибкий: сегодня мы сотрудничаем с одним агентством, завтра можем предложить другого проверенного партнёра, всегда сохраняя высокий стандарт качества и сервиса.",
            highlighted:
                "💳 Оплата производится только перед началом экскурсии напрямую организатору. Через Kemer.app нет предоплаты, скрытых комиссий или дополнительных платежей — вы полностью контролируете свои расходы, а качество услуг гарантировано.",
            whyTitle: "Почему выбирают нас",
            reasons: [
                " Без предоплаты и переплат",
                " Проверенные партнёры и маршруты",
                " Быстрый отклик в WhatsApp и Telegram",
                " Местная мультиязычная поддержка в Кемере",
                " Гибкая сеть партнёров — всегда лучшие варианты",
                " Персонализированные рекомендации под ваши желания",
                " Полная прозрачность и честные условия",
            ],
            quote: "Мы живём в Кемере и знаем все уголки региона: куда стоит пойти, что посмотреть, где поесть и как провести день максимально интересно. Через Kemer.app мы делимся только проверенными и надёжными рекомендациями, чтобы ваш отдых был насыщенным и безопасным.",
            paragraph2:
                "Наша задача — быть вашим надёжным онлайн-представителем в Кемере: сопровождать до, во время и после поездки, помогать с подбором туров, транспорта, аренды и развлечений, предлагая советы и рекомендации, адаптированные под ваши желания. С Kemer.app вы можете расслабиться и наслаждаться отдыхом, зная, что каждая деталь продумана и организована профессионально.",
            licenseText: "Лицензия № 3834",
            partnersTitle: "Наши партнёры",
            partners: [
                "✔ Местные туристические агентства с многолетним опытом",
                "✔ Организаторы экскурсий с отличной репутацией",
                "✔ Компании по аренде автомобилей с широким выбором",
                "✔ Поставщики яхт и водных развлечений",
                "✔ Отели и апартаменты, проверенные нами лично",
            ],
        },

        en: {
            title: "About us — Kemer.app",
            intro: "We’re the team behind Kemer.app, based in Turkey, dedicated to helping travelers discover the best and safest experiences in Kemer and its surroundings. Through our service, you gain easy and reliable access to excursions, transfers, car rentals, yachts, and accommodation — all provided by trusted local partners. Our mission is to make your holiday seamless, enjoyable, and worry-free, giving you peace of mind every step of the way.",
            paragraph1:
                "We don’t operate tours ourselves. Instead, we act as the online representation of our partners: through Kemer.app, you can book services directly from local travel agencies and tour organizers trusted by both residents and visitors. We carefully select each option, review routes and conditions, and personally check feedback to ensure your experience is smooth, safe, and enjoyable. Our approach is flexible: today we may work with one agency, tomorrow with another verified partner, while always maintaining high standards of service and quality.",
            highlighted:
                "💳 All payments are made directly to the organizer right before the excursion. With Kemer.app, there are never any prepayments or hidden fees — you stay in full control of your spending while enjoying guaranteed quality. This allows you to focus entirely on the fun and adventure, without worrying about deposits or unexpected charges.",
            whyTitle: "Why choose us",
            reasons: [
                " No prepayment or extra fees",
                " Trusted partners and routes",
                " Fast response via WhatsApp and Telegram",
                " Local multilingual support in Kemer",
                " Flexible partner network — always the best options",
                " Personalized recommendations tailored to your needs",
                " Full transparency and honest conditions",
            ],

            quote: "Living in Kemer, we know the region’s hidden gems, must-see sights, and the best ways to spend your day. Through Kemer.app, we share only proven, trustworthy recommendations so that your trip is both exciting and safe. We don’t promote everything — only what we would personally enjoy ourselves or recommend to our closest friends.",
            paragraph2:
                "Our goal is to serve as your reliable online representative in Kemer: guiding you before, during, and after your trip. We help with selecting tours, transport, rentals, and entertainment, offering tips and advice tailored to your preferences. With Kemer.app, you can relax knowing that your trip is organized carefully, professionally, and with a personal touch — making each experience memorable, smooth, and genuinely enjoyable.",
            licenseText: "Licensed No. 3834",
            partnersTitle: "Our partners",
            partners: [
                "✔ Local travel agencies with years of experience",
                "✔ Tour organizers with excellent reputations",
                "✔ Car rental companies with a wide selection",
                "✔ Yacht and water activity providers",
                "✔ Hotels and apartments personally vetted by us",
            ],
        },

        tr: {
            title: "Hakkımızda — Kemer.app",
            intro: "Biz, Türkiye'de yaşayan Kemer.app ekibiyiz ve Kemer ve çevresinde en güvenli ve keyifli deneyimleri bulmanıza yardımcı oluyoruz. Hizmetimiz aracılığıyla turlara, transferlere, araç kiralamaya, yatlara ve konaklamalara kolay ve güvenilir bir şekilde erişebilirsiniz — tümü güvenilir yerel partnerlerden sağlanmaktadır. Amacımız tatilinizi sorunsuz, keyifli ve güvenli hale getirmek, her adımda size huzur sağlamaktır.",
            paragraph1:
                "Turları kendimiz düzenlemiyoruz; bunun yerine partnerlerimizin online temsilcisi olarak hareket ediyoruz. Kemer.app üzerinden, yerel seyahat acenteleri ve tura düzenleyicilerinin hizmetlerini doğrudan rezerve edebilirsiniz. Her seçeneği titizlikle seçiyor, güzergahları ve koşulları inceliyor, geri bildirimleri kontrol ediyoruz, böylece deneyiminiz sorunsuz, güvenli ve keyifli olur. Yaklaşımımız esnektir: bugün bir acente ile çalışabiliriz, yarın başka doğrulanmış bir partneri önerebiliriz, her zaman yüksek kalite ve hizmet standartlarını koruyarak.",
            highlighted:
                "💳 Ödemeler tur başlamadan hemen önce doğrudan organizatöre yapılır. Kemer.app aracılığıyla hiçbir zaman ön ödeme veya gizli ücret yoktur — harcamalarınızı tamamen kontrol edersiniz ve hizmetin kalitesi garanti altındadır. Bu sayede tatilinize tamamen odaklanabilirsiniz, depozito veya sürpriz ücretler hakkında endişelenmeden.",
            whyTitle: "Neden bizi seçmelisiniz",
            reasons: [
                " Ön ödeme ve gizli ücret yok",
                " Güvenilir partnerler ve güzergahlar",
                " WhatsApp ve Telegram üzerinden hızlı yanıt",
                " Kemer’de çok dilli yerel destek",
                " Esnek partner ağı — her zaman en iyi seçenekler",
                " Tercihlerinize uygun kişiselleştirilmiş öneriler",
                " Tam şeffaflık ve dürüst koşullar",
            ],
            quote: "Kemer’de yaşıyoruz ve bölgenin gizli güzelliklerini, görülmesi gereken yerleri ve günü en iyi şekilde nasıl geçireceğinizi biliyoruz. Kemer.app aracılığıyla sadece kanıtlanmış ve güvenilir öneriler paylaşıyoruz, böylece seyahatiniz hem heyecan verici hem de güvenli olur. Her şeyi tanıtmıyoruz — sadece kendimizin veya en yakın arkadaşlarımızın keyifle deneyimleyeceği seçenekleri öneriyoruz.",
            paragraph2:
                "Amacımız, Kemer’de sizin güvenilir online temsilciniz olmaktır: seyahatten önce, sırasında ve sonrasında rehberlik ederiz. Turlar, ulaşım, kiralama ve eğlence seçiminde yardımcı olur, tercihleriniz doğrultusunda ipuçları ve tavsiyeler sunarız. Kemer.app ile tatilinizin her detayı dikkatle ve profesyonelce organize edilmiş olduğundan emin olabilirsiniz, böylece her deneyim unutulmaz, sorunsuz ve gerçekten keyifli olur.",
            licenseText: "Lisansı No. 3834",
            partnersTitle: "Ortaklarımız",
            partners: [
                "✔ Yılların deneyimine sahip yerel seyahat acenteleri",
                "✔ Mükemmel üne sahip tur organizatörleri",
                "✔ Geniş seçenek sunan araç kiralama şirketleri",
                "✔ Yat ve su aktiviteleri sağlayıcıları",
                "✔ Tarafımızdan kişisel olarak denetlenen oteller ve daireler",
            ],
        },
    };

    const t = content[$localeStore] || content["en"];
</script>

<PageSeoHead
    {baseUrl}
    {baseName}
    locale={$localeStore}
    type={urlPath}
    {urlPath}
    seo={seoText[$localeStore] ?? seoText.en}
    title={seoText[$localeStore]?.title}
    description={seoText[$localeStore]?.description}
    keywords={seoText[$localeStore]?.keywords}
    image={`${baseUrl}/images/about/about1.webp`}
/>

<div class="content">
    <main class="about_page">
        <div class="main-info">
            <Galery {images} title={t.title} />
            <div class="info">
                <h1 class="title">{t.title}</h1>
                <p class="text intro">{t.intro}</p>
                <p class="text">{t.paragraph1}</p>
                <p class="highlight">{t.highlighted}</p>
            </div>
        </div>
        <blockquote class="quote">“{t.quote}”</blockquote>
        <h2 class="subtitle">{t.whyTitle}</h2>

        <ul class="reasons">
            {#each t.reasons as reason}
                <li>✅ {reason}</li>
            {/each}
        </ul>

        <p class="text">{t.paragraph2}</p>
        <h2 class="subtitle">{t.licenseText}</h2>
        <div class="license">
            <img alt="license" src="/images/other/license.webp" />
        </div>
        <h2 class="subtitle">{t.partnersTitle}</h2>
        <ul class="reasons">
            {#each t.partners as partner}
                <li>{partner}</li>
            {/each}
        </ul>
        <div style="padding: var(--space-vertical-sm);">
            <BuyMeACoffe locale={$localeStore} />
        </div>
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
        padding: var(--space-vertical-md) 0;
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
        padding: 0 var(--space-horizontal-sm);
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
        padding: 0 var(--space-horizontal-sm);
        padding-left: 1rem;
        border-left: 3px solid var(--color-primary);
    }

    .reasons {
        list-style: none;
        padding-left: 0;
        padding: 0 var(--space-horizontal-sm);
    }

    .reasons li {
        margin-bottom: 0.5rem;
        font-size: var(--text-md);
    }

    .main-info {
        width: 100%;
        display: grid;
        grid-template-columns: 50% 1fr;
        align-items: start;
        justify-content: center;
        gap: var(--space-horizontal-md);
    }

    @media (max-width: 768px) {
        .main-info {
            display: flex;
            flex-direction: column;
        }
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
</style>
