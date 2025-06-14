<script>
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import WhatsApp from "$lib/components/UI/buttons/WhatsApp.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
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
        // Инициализация сервиса валют
        initCurrencyService();
        const interval = setInterval(initCurrencyService, 30 * 60 * 1000);

        // Google Analytics (gtag.js)
        const gtagScript = document.createElement("script");
        gtagScript.async = true;
        gtagScript.src =
            "https://www.googletagmanager.com/gtag/js?id=G-RBNVCFN9DR";
        document.head.appendChild(gtagScript);

        gtagScript.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                window.dataLayer.push(arguments);
            }
            window.gtag = gtag;
            gtag("js", new Date());
            gtag("config", "G-RBNVCFN9DR");
        };

        // Яндекс.Метрика
        const ymScript = document.createElement("script");
        ymScript.async = true;
        ymScript.src = "https://mc.yandex.ru/metrika/tag.js";
        document.head.appendChild(ymScript);

        ymScript.onload = () => {
            window.ym =
                window.ym ||
                function () {
                    (window.ym.a = window.ym.a || []).push(arguments);
                };
            window.ym.l = 1 * new Date();
            window.ym(97637253, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
            });
        };

        return () => clearInterval(interval);
    });

    let { children } = $props();
</script>

<svelte:head>
    <!-- Автор сайта -->
    <meta name="author" content="Kemer.app" />

    <!-- Manifest и фавиконки -->
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <meta name="theme-color" content="#ffffff" />
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
        <TheMobileMenu />
        <TheHeader />
        {@render children()}
        <TheFooter />
    </div>
</div>
