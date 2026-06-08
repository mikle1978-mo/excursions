// src/lib/config/layout/about.config.js
import { currentYear } from "$lib/constants/date";

// src/lib/config/pages/about.config.js
export const aboutConfig = {
    ru: {
        // slug: "about",
        title: "О нас",
        description: `Узнайте больше о команде Kemer.app, нашей миссии и партнёрах. Мы помогаем туристам находить лучшие экскурсии, трансферы и аренду в Кемере с 2016 по ${currentYear} года.`,
        h1: "О нас — Kemer.app",
        images: [
            { url: "/images/about/about1.webp" },
            { url: "/images/about/about2.webp" },
            { url: "/images/about/about3.webp" },
            { url: "/images/about/about4.webp" },
            { url: "/images/about/about5.webp" },
        ],
        intro: "Мы — команда Kemer.app, живущая в Турции, и помогаем туристам находить самые интересные и безопасные предложения в Кемере и окрестностях. Через наш сервис вы получаете удобный и надёжный доступ к экскурсиям, трансферам, аренде автомобилей, яхт и жилья — всё от проверенных местных партнёров. Наша цель — сделать ваш отдых комфортным, запоминающимся и полностью безопасным, чтобы вы могли наслаждаться каждой минутой без лишних забот.",
        paragraph1:
            "Мы не проводим экскурсии сами, а выступаем как онлайн-представительство наших партнёров: с помощью Kemer.app вы бронируете услуги напрямую у туристических агентств и организаторов, которым доверяют местные жители и гости города. Каждый маршрут тщательно проверяется, условия изучаются, а отзывы анализируются, чтобы вы могли отдыхать без неожиданностей. Наш подход гибкий: сегодня мы сотрудничаем с одним агентством, завтра можем предложить другого проверенного партнёра, всегда сохраняя высокий стандарт качества и сервиса.",
        highlighted:
            "💳 Оплата производится только перед началом экскурсии напрямую организатору. Через Kemer.app нет предоплаты, скрытых комиссий или дополнительных платежей — вы полностью контролируете свои расходы, а качество услуг гарантировано.",

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
        partners: [
            "✔ Местные туристические агентства с многолетним опытом",
            "✔ Организаторы экскурсий с отличной репутацией",
            "✔ Компании по аренде автомобилей с широким выбором",
            "✔ Поставщики яхт и водных развлечений",
            "✔ Отели и апартаменты, проверенные нами лично",
        ],
    },

    en: {
        // slug: "about",
        title: "About us — Kemer.app",
        description: `Learn more about the Kemer.app team, our mission, and partners. We help travelers find the best excursions, transfers, and rentals in Kemer since 2016 to ${currentYear}.`,
        h1: "About us — Kemer.app",
        images: [
            {
                url: "/images/about/about1.webp",
                alt: "Фото офиса Kemer.app 1 из 5",
            },
            {
                url: "/images/about/about2.webp",
                alt: "Фото офиса Kemer.app 2 из 5",
            },
            { url: "/images/about/about3.webp" },
            { url: "/images/about/about4.webp" },
            { url: "/images/about/about5.webp" },
        ],
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

        partners: [
            "✔ Local travel agencies with years of experience",
            "✔ Tour organizers with excellent reputations",
            "✔ Car rental companies with a wide selection",
            "✔ Yacht and water activity providers",
            "✔ Hotels and apartments personally vetted by us",
        ],
    },

    tr: {
        // slug: "about",
        title: "Hakkımızda — Kemer.app",
        h1: "Hakkımızda — Kemer.app",
        images: [
            { url: "/images/about/about1.webp" },
            { url: "/images/about/about2.webp" },
            { url: "/images/about/about3.webp" },
            { url: "/images/about/about4.webp" },
            { url: "/images/about/about5.webp" },
        ],
        description: `Kemer.app ekibi, misyonumuz ve ortaklarımız hakkında daha fazla bilgi edinin. 2016'dan ${currentYear} yılına kadar Kemer'de en iyi turlar, transferler ve kiralamaları bulmanıza yardımcı oluyoruz.`,
        intro: "Biz, Türkiye'de yaşayan Kemer.app ekibiyiz ve Kemer ve çevresinde en güvenli ve keyifli deneyimleri bulmanıza yardımcı oluyoruz. Hizmetimiz aracılığıyla turlara, transferlere, araç kiralamaya, yatlara ve konaklamalara kolay ve güvenilir bir şekilde erişebilirsiniz — tümü güvenilir yerel partnerlerden sağlanmaktadır. Amacımız tatilinizi sorunsuz, keyifli ve güvenli hale getirmek, her adımda size huzur sağlamaktır.",
        paragraph1:
            "Turları kendimiz düzenlemiyoruz; bunun yerine partnerlerimizin online temsilcisi olarak hareket ediyoruz. Kemer.app üzerinden, yerel seyahat acenteleri ve tura düzenleyicilerinin hizmetlerini doğrudan rezerve edebilirsiniz. Her seçeneği titizlikle seçiyor, güzergahları ve koşulları inceliyor, geri bildirimleri kontrol ediyoruz, böylece deneyiminiz sorunsuz, güvenli ve keyifli olur. Yaklaşımımız esnektir: bugün bir acente ile çalışabiliriz, yarın başka doğrulanmış bir partneri önerebiliriz, her zaman yüksek kalite ve hizmet standartlarını koruyarak.",
        highlighted:
            "💳 Ödemeler tur başlamadan hemen önce doğrudan organizatöre yapılır. Kemer.app aracılığıyla hiçbir zaman ön ödeme veya gizli ücret yoktur — harcamalarınızı tamamen kontrol edersiniz ve hizmetin kalitesi garanti altındadır. Bu sayede tatilinize tamamen odaklanabilirsiniz, depozito veya sürpriz ücretler hakkında endişelenmeden.",

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

        partners: [
            "✔ Yılların deneyimine sahip yerel seyahat acenteleri",
            "✔ Mükemmel üne sahip tur organizatörleri",
            "✔ Geniş seçenek sunan araç kiralama şirketleri",
            "✔ Yat ve su aktiviteleri sağlayıcıları",
            "✔ Tarafımızdan kişisel olarak denetlenen oteller ve daireler",
        ],
    },
};
