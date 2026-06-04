<!-- src\routes\+error.svelte -->

<script>
    import { page } from "$app/state";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    export let data;

    console.log("PAGE STATUS:", page.status);
    console.log("PAGE ERROR:", page.error);

    const lang = data?.lang ?? "ru";

    let countdown = 10;

    const content = {
        title: {
            ru: "404 Страница не найдена",
            en: "404 Page Not Found",
        },

        text: {
            ru: "К сожалению, такая страница отсутствует.",
            en: "Sorry, the page you are looking for does not exist.",
        },

        button: {
            ru: "На главную",
            en: "Go Home",
        },

        redirect: {
            ru: "Перенаправление через",
            en: "Redirecting in",
        },

        seconds: {
            ru: "секунд",
            en: "seconds",
        },
    };

    onMount(() => {
        const interval = setInterval(() => {
            if (countdown > 0) {
                countdown--;
                return;
            }

            clearInterval(interval);
            goto(`/${lang}`);
        }, 1000);

        return () => clearInterval(interval);
    });
</script>

<svelte:head>
    <title>
        {content.title[lang]} | {import.meta.env.VITE_BASE_NAME}
    </title>

    <meta name="description" content={content.text[lang]} />

    <meta name="robots" content="noindex" />
</svelte:head>

<main class="wrapper">
    <div class="error-box">
        <h1>{content.title[lang]}</h1>

        <p>{content.text[lang]}</p>

        <a class="button" href={`/${lang}`}>
            {content.button[lang]}
        </a>

        <p class="redirect-text">
            {content.redirect[lang]}

            <br />

            {countdown}
            {content.seconds[lang]}
        </p>
    </div>
    <pre>
{JSON.stringify(
            {
                message: page.error?.message,
                stack: page.error?.stack,
                status: page.status,
            },
            null,
            2,
        )}
</pre>
</main>

<style>
    .wrapper {
        min-height: 100vh;

        display: flex;

        align-items: center;
        justify-content: center;

        padding: 24px;
    }

    .error-box {
        width: 100%;
        max-width: 500px;

        padding: 40px;

        text-align: center;

        border-radius: var(--radius-lg);

        background: var(--color-bg);

        color: var(--color-text);

        box-shadow: var(--shadow-lg);

        opacity: 0;

        animation: fadeIn 0.3s ease forwards;
    }

    h1 {
        margin-bottom: 16px;
    }

    p {
        margin-bottom: 16px;
    }

    .button {
        display: inline-block;

        margin-top: 8px;
    }

    .redirect-text {
        margin-top: 20px;

        font-size: var(--text-sm);

        color: var(--color-gray-700);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
