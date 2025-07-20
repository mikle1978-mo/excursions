<script>
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    onMount(() => {
        if (!browser) return;

        const metrikaScriptSrc = "https://mc.yandex.ru/metrika/tag.js";
        const scriptExists = Array.from(document.scripts).some(
            (s) => s.src === metrikaScriptSrc
        );

        if (!scriptExists) {
            const script = document.createElement("script");
            script.async = true;
            script.src = metrikaScriptSrc;
            document.head.appendChild(script);

            script.onload = () => {
                if (window.ym) {
                    window.ym("97637253", "init", {
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true,
                    });
                }
            };
        } else {
            if (window.ym) {
                window.ym("97637253", "init", {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true,
                    webvisor: true,
                });
            } else {
                const interval = setInterval(() => {
                    if (window.ym) {
                        window.ym("97637253", "init", {
                            clickmap: true,
                            trackLinks: true,
                            accurateTrackBounce: true,
                            webvisor: true,
                        });
                        clearInterval(interval);
                    }
                }, 100);
                setTimeout(() => clearInterval(interval), 10000);
            }
        }
    });
</script>
