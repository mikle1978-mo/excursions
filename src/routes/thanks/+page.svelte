<script>
    import { onMount, onDestroy } from "svelte";
    import { locale } from "$lib/stores/locale.js";
    import { thanks_page } from "$lib/i18n/thanks_page";
    import { page } from "$app/stores";

    let lang = $page.params.lang;

    const baseUrl = import.meta.env.VITE_BASE_URL;
    const baseName = import.meta.env.VITE_BASE_NAME;

    // По желанию — автопереход через 10 секунд
    let countdown = 10;
    let interval;

    onMount(() => {
        interval = setInterval(() => {
            if (countdown > 0) {
                countdown -= 1;
            } else {
                clearInterval(interval);
                // Переход на главную
                // window.location.href = "/";
            }
        }, 1000);
    });

    // Очистка таймера при размонтировании (хорошая практика)
    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<svelte:head>
    <title>{thanks_page.title[lang] ?? thanks_page.title.en} | {baseName}</title
    >
    <meta
        name="description"
        content={thanks_page.text[lang] ?? thanks_page.text.en}
    />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content={baseName} />
    <meta name="theme-color" content="#0066cc" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
</svelte:head>

<main>
    <div class="thankyou-box">
        <h1>{thanks_page.title[$locale]}</h1>
        <p>
            {thanks_page.text[$locale]}
        </p>
        <a class="button" href="/"> {thanks_page.back_button[$locale]}</a>
        <p
            style="margin-top: var(--space-vertical-sm); font-size: var(--text-sm); color: var(--color-gray-700);"
        >
            {thanks_page.redirect_note[$locale]} <br />{countdown}
            {countdown === 1
                ? thanks_page.seconds[$locale]
                : thanks_page.seconds[$locale]}
        </p>
    </div>
</main>

<style>
    .thankyou-box {
        margin: auto;
        background-color: var(--color-bg);
        border-radius: var(--radius-lg);
        padding: var(--space-vertical-lg) var(--space-horizontal-lg);
        max-width: 500px;
        width: 100%;
        text-align: center;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        animation: fadeIn 0.5s forwards;
        color: var(--color-text);
    }

    h1 {
        font-size: var(--text-xl);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-primary);
    }

    p {
        font-size: var(--text-md);
        margin-bottom: var(--space-vertical-md);
        color: var(--color-text);
    }

    a.button {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: var(--color-primary);
        color: var(--color-light);
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: bold;
        transition: background-color var(--transition-normal);
        cursor: pointer;
    }

    a.button:hover {
        background-color: var(--color-primary-hover);
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
</style>
