<script>
    import { onMount, onDestroy } from "svelte";

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
                window.location.href = "/";
            }
        }, 1000);
    });

    // Очистка таймера при размонтировании (хорошая практика)
    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<main>
    <div class="thankyou-box">
        <h1>Спасибо за заявку!</h1>
        <p>
            Мы свяжемся с вами в ближайшее время. Обычно это занимает не более
            15 минут.
        </p>
        <a class="button" href="/">Вернуться на главную</a>
        <p
            style="margin-top: var(--space-vertical-sm); font-size: var(--text-sm); color: var(--color-gray-700);"
        >
            Автоматический переход на главную через <br />{countdown}
            {countdown === 1 ? "секунду" : "секунд"}
        </p>
    </div>
</main>

<style>
    .thankyou-box {
        margin: auto;
        background-color: var(--color-gray-100);
        border-radius: var(--radius-lg);
        padding: var(--space-vertical-lg) var(--space-horizontal-lg);
        max-width: 500px;
        width: 100%;
        text-align: center;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        animation: fadeIn 0.5s forwards;
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
