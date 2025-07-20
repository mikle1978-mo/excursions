<script>
    import { browser } from "$app/environment";
    export let gtmId = "GTM-WWB7BSZL";

    if (browser) {
        // Инициализируем dataLayer и пушим стартовое событие
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
        });

        // Создаем и вставляем тег загрузки GTM
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
        document.head.appendChild(script);
    }
</script>

{#if browser}
    <noscript>
        <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style="display:none;visibility:hidden"
            title="Google Tag Manager"
        ></iframe>
    </noscript>
{/if}
