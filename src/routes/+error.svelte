<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    export let error;
    export let status;
    console.log("Custom error page", { status, error });

    // Локализация для 404 — можно вынести в отдельный файл, как у тебя thanks_page
    const error_404 = {
        title: {
            ru: "404 Страница не найдена",
            en: "404 Page Not Found",
        },
        text: {
            ru: "К сожалению, такая страница отсутствует.",
            en: "Sorry, the page you are looking for does not exist.",
        },
        back_button: {
            ru: "На главную",
            en: "Go Home",
        },
        redirect_note: {
            ru: "Вы будете перенаправлены на главную через",
            en: "You will be redirected to the homepage in",
        },
        seconds: {
            ru: "секунд",
            en: "seconds",
        },
    };

    let countdown = 10;
    let interval;

    const { params } = $page;
    const lang = params.lang ?? "en";

    onMount(() => {
        interval = setInterval(() => {
            if (countdown > 0) {
                countdown -= 1;
            } else {
                clearInterval(interval);
                window.location.href = `/`;
            }
        }, 1000);
    });

    // Очистка таймера при размонтировании
    import { onDestroy } from "svelte";
    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<svelte:head>
    <title
        >{error_404.title[lang] ?? error_404.title.en} | {import.meta.env
            .VITE_BASE_NAME}</title
    >
    <meta
        name="description"
        content={error_404.text[lang] ?? error_404.text.en}
    />
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main>
    <div class="error-box">
        <h1>{error_404.title[lang] ?? error_404.title.en}</h1>
        <p>{error_404.text[lang] ?? error_404.text.en}</p>
        <a class="button" href="/{lang}"
            >{error_404.back_button[lang] ?? error_404.back_button.en}</a
        >
        <p
            style="margin-top: var(--space-vertical-sm); font-size: var(--text-sm); color: var(--color-gray-700);"
        >
            {error_404.redirect_note[lang] ?? error_404.redirect_note.en} <br />
            {countdown}
            {error_404.seconds[lang] ?? error_404.seconds.en}
        </p>
    </div>
</main>

<style>
    .error-box {
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
