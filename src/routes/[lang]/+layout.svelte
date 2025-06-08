<script>
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import { onMount } from "svelte";

    import { initCurrencyService } from "$lib/services/currencyService";
    import { page } from "$app/stores";

    let lang = $page.params.lang || "en";

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    const SEO_TEXT = {
        ru: {
            title: "Экскурсии по Турции",
            description:
                "Увлекательные экскурсии по Турции. Гиды, трансфер, комфорт и уникальные маршруты.",
            keywords: "экскурсии в Турции, туры, гиды, отдых, Стамбул, Анталия",
            twitter:
                "Экскурсии по Турции от местных гидов. Онлайн бронирование.",
        },
        en: {
            title: "Excursions in Turkey",
            description:
                "Exciting tours around Turkey. Guides, transfer, comfort and unique routes.",
            keywords:
                "excursions in Turkey, tours, guides, vacation, Istanbul, Antalya",
            twitter: "Tours in Turkey with local guides. Book online now.",
        },
        tr: {
            title: "Türkiye'de Turlar",
            description:
                "Türkiye'de heyecan verici turlar. Rehberler, transfer, konfor ve eşsiz rotalar.",
            keywords: "Türkiye'de turlar, rehberler, tatil, İstanbul, Antalya",
            twitter:
                "Yerel rehberlerle Türkiye'de turlar. Hemen çevrimiçi rezervasyon yapin.",
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
        <TheHeader />
        {@render children()}
        <TheFooter />
    </div>
</div>
