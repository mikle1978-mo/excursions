<script>
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import WhatsApp from "$lib/components/UI/buttons/WhatsApp.svelte";
    import { onMount } from "svelte";

    import { initCurrencyService } from "$lib/services/currencyService";
    import { page } from "$app/stores";

    let lang = $page.params.lang;

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: "Отдых в Кемере — экскурсии, аренда яхт и авто, трансфер",
            description:
                "Все для комфортного отдыха в Кемере: увлекательные экскурсии, аренда яхт и автомобилей, трансферы. Индивидуальный подход, лучшие маршруты и сервис.",
            keywords:
                "Кемер, отдых в Кемере, экскурсии Кемер, аренда яхт Кемер, аренда авто Кемер, трансфер Кемер, туры Турция",
            twitter:
                "Комфортный отдых в Кемере — экскурсии, аренда яхт и авто, трансферы. Онлайн-бронирование на Kemer.app",
        },
        en: {
            title: "Kemer Vacation — Tours, Yacht & Car Rentals, Transfers",
            description:
                "Everything for a comfortable stay in Kemer: exciting excursions, yacht and car rentals, and transfers. Personalized service and the best routes.",
            keywords:
                "Kemer, Kemer tours, yacht rental Kemer, car rental Kemer, transfers Kemer, vacation Turkey",
            twitter:
                "Comfortable vacation in Kemer — excursions, yacht and car rentals, transfers. Book online at Kemer.app",
        },
        tr: {
            title: "Kemer Tatili — Turlar, Yat ve Araba Kiralama, Transfer",
            description:
                "Kemer'de konforlu tatil için her şey: heyecan verici turlar, yat ve araç kiralama, transfer hizmetleri. Kişisel yaklaşim ve en iyi rotalar.",
            keywords:
                "Kemer, Kemer turlari, yat kiralama Kemer, araba kiralama Kemer, transfer Kemer, Türkiye tatili",
            twitter:
                "Kemer'de konforlu tatil — turlar, yat ve araba kiralama, transferler. Kemer.app'te çevrimiçi rezervasyon yapin.",
        },
    };

    onMount(() => {
        initCurrencyService();
        const interval = setInterval(initCurrencyService, 30 * 60 * 1000);
        return () => clearInterval(interval);
    });

    let { children } = $props();
</script>

<svelte:head>
    <title>{SEO_TEXT[lang]?.title ?? SEO_TEXT.en.title} | {baseName}</title>
    <meta
        name="description"
        content={SEO_TEXT[lang]?.description ?? SEO_TEXT.en.description}
    />
    <meta
        name="keywords"
        content={SEO_TEXT[lang]?.keywords ?? SEO_TEXT.en.keywords}
    />
    <meta name="author" content={baseName} />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <link rel="canonical" href={`${baseUrl}/${lang}`} />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={baseName} />
    <meta
        property="og:title"
        content={SEO_TEXT[lang]?.title ?? SEO_TEXT.en.title}
    />
    <meta
        property="og:description"
        content={SEO_TEXT[lang]?.description ?? SEO_TEXT.en.description}
    />
    <meta
        property="og:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />
    <meta property="og:url" content={`${baseUrl}/${lang}`} />
    <meta property="og:locale" content={lang} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
        name="twitter:title"
        content={SEO_TEXT[lang]?.title ?? SEO_TEXT.en.title}
    />
    <meta
        name="twitter:description"
        content={SEO_TEXT[lang]?.twitter ?? SEO_TEXT.en.twitter}
    />
    <meta
        name="twitter:image"
        content={`${baseUrl}/images/excursions/excursion_default.webp`}
    />

    <!-- Google tag (gtag.js) -->

    <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RBNVCFN9DR"
    ></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-RBNVCFN9DR");
    </script>

    <!-- Yandex Metrika -->

    <script>
        (function (m, e, t, r, i, k, a) {
            m[i] =
                m[i] ||
                function () {
                    (m[i].a = m[i].a || []).push(arguments);
                };
            m[i].l = 1 * new Date();
            (k = e.createElement(t)),
                (a = e.getElementsByTagName(t)[0]),
                (k.async = 1),
                (k.src = r),
                a.parentNode.insertBefore(k, a);
        })(
            window,
            document,
            "script",
            "https://mc.yandex.ru/metrika/tag.js",
            "ym"
        );

        ym(97637253, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
        });
    </script>
</svelte:head>

<noscript>
    <div>
        <img
            src="https://mc.yandex.ru/watch/97637253"
            style="position:absolute; left:-9999px;"
            alt=""
        />
    </div>
</noscript>

<div class="container">
    <div class="page">
        <WhatsApp />
        <TheHeader />
        {@render children()}
        <TheFooter />
    </div>
</div>
