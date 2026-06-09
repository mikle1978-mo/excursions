<!-- src\routes\+layout.svelte -->

<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import SchemaOrganization from "$lib/components/seo/SchemaOrganization.svelte";
    import GoogleTagManager from "$lib/components/seo/GoogleTagManager.svelte";
    import YandexMetrika from "$lib/components/seo/YandexMetrika.svelte";

    export let data;
    export let gtmId = "GTM-WWB7BSZL";

    // Синхронизация локали
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    onMount(() => {
        function handleKeydown(e) {
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
                window.location.href = "/admin";
            }
        }

        window.addEventListener("keydown", handleKeydown);

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
            "ym",
        );

        window.ym?.(97637253, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
            webvisor: true,
        });

        return () => {
            window.removeEventListener("keydown", handleKeydown);
            clearInterval(interval);
        };
    });
</script>

<GoogleTagManager {gtmId} />
<SchemaOrganization lang={data.lang} />

<svelte:head>
    <meta name="author" content="Kemer.app" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
    <meta name="theme-color" content="#ffffff" />
    <!-- for miralink verification -->
    <meta name="b4d2ca1f28ced862e56d30dc82da7cd4" content="" />
    <!-- for miralink verification -->
    <!-- for travelpayouts verification -->
    <!-- <script data-noptimize="1" data-cfasync="false" data-wpfc-render="false">
        (function () {
            var script = document.createElement("script");
            script.async = 1;
            script.src = "https://emrld.cc/NDcxNDIz.js?t=471423";
            document.head.appendChild(script);
        })();
    </script> -->
    <!-- for travelpayouts verification -->
</svelte:head>

<slot />
