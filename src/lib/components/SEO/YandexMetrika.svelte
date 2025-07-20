<script>
    import { browser } from "$app/environment";

    // ID метрики
    export let counterId = "97637253";
</script>

<svelte:head>
    <!-- Вставка только на сервере -->
    {#if !browser}
        <script type="text/javascript">
            (function (m, e, t, r, i, k, a) {
                m[i] =
                    m[i] ||
                    function () {
                        (m[i].a = m[i].a || []).push(arguments);
                    };
                m[i].l = 1 * new Date();
                for (let j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) return;
                }
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

            ym({ counterId }, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true,
            });
        </script>

        <noscript>
            <div>
                <img
                    src={"https://mc.yandex.ru/watch/" + counterId}
                    style="position:absolute; left:-9999px;"
                    alt=""
                />
            </div>
        </noscript>
    {/if}
</svelte:head>
