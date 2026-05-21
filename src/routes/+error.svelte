<script>
    import { page } from "$app/state";
    import { onMount, onDestroy } from "svelte";

    let { error, status } = $props();
    console.log("==============error, status======================");
    console.log(error, status);
    console.log("==============error, status======================");

    const lang = $derived(page.params.lang ?? "en");

    let countdown = $state(10);
    let interval;

    onMount(() => {
        interval = setInterval(() => {
            if (countdown > 0) {
                countdown -= 1;
            } else {
                clearInterval(interval);
                window.location.href = `/${page.params.lang ?? "en"}`;
            }
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

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

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
</style>
