<script>
    import { browser } from "$app/environment"; // Проверка, что код выполняется в браузере (а не на сервере)
    export let gtmId = "GTM-WWB7BSZL"; // Идентификатор вашего GTM-контейнера

    if (browser) {
        // Ждём полной загрузки страницы, чтобы GTM не мешал LCP и другим важным метрикам
        window.addEventListener("load", () => {
            // Создаём dataLayer (если ещё не создан) и пушим событие начала
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                "gtm.start": new Date().getTime(),
                event: "gtm.js",
            });

            // Создаём тег <script> и подключаем GTM-скрипт
            const script = document.createElement("script");
            script.async = true; // Загрузка без блокировки рендера
            script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
            document.head.appendChild(script); // Вставляем в <head>
        });
    }
</script>

{#if browser}
    {@html `
        <!-- Отложенный <noscript> iframe для пользователей без JavaScript -->
        <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
                height="0" width="0" style="display:none;visibility:hidden"
                title="Google Tag Manager">
            </iframe>
        </noscript>
    `}
{/if}
