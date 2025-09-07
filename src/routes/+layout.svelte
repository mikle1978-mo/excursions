<script>
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import WhatsApp from "$lib/components/UI/buttons/WhatsApp.svelte";
    import TheMobileMenu from "$lib/components/layout/TheMobileMenu.svelte";
    import { onMount } from "svelte";
    import { initCurrencyService } from "$lib/services/currencyService";
    import { locale as localeStore, setLocale } from "$lib/stores/locale.js";
    import { browser } from "$app/environment";
    import SeoOrganization from "$lib/components/SEO/SeoOrganization.svelte";
    import GoogleTagManager from "$lib/components/SEO/GoogleTagManager.svelte";
    import YandexMetrika from "$lib/components/SEO/YandexMetrika.svelte";

    export let data;
    export let gtmId = "GTM-WWB7BSZL";

    setLocale(data.lang);

    // Синхронизация локали
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
        function handleKeydown(e) {
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
                window.location.href = "/admin";
            }
        }

        window.addEventListener("keydown", handleKeydown);
        // Существующий код
        const unsubscribe = localeStore.subscribe((value) => {
            document.documentElement.lang = value;
            console.log("Set lang:", value);
        });
        initCurrencyService();
        const interval = setInterval(initCurrencyService, 30 * 60 * 1000);

        // 👇 Добавляем метрику
        (function (m, e, t, r, i, k, a) {
            m[i] =
                m[i] ||
                function () {
                    (m[i].a = m[i].a || []).push(arguments);
                };
            m[i].l = 1 * new Date();
            (k = e.createElement(t)), (a = e.getElementsByTagName(t)[0]);
            k.async = 1;
            k.src = r;
            a.parentNode.insertBefore(k, a);
        })(
            window,
            document,
            "script",
            "https://mc.yandex.ru/metrika/tag.js",
            "ym"
        );

        window.ym?.(97637253, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
        });

        return () => {
            window.removeEventListener("keydown", handleKeydown);
            unsubscribe();
            clearInterval(interval);
        };
    });
</script>

<GoogleTagManager {gtmId} />
<SeoOrganization />

<svelte:head>
    <meta name="author" content="Kemer.app" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="b4d2ca1f28ced862e56d30dc82da7cd4" content="" />
    <!-- for miralink verification -->
</svelte:head>

<slot />
