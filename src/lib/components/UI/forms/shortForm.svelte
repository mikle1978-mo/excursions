<script>
    import { onMount } from "svelte";
    import TGMessage from "$lib/helpers/tgMessage";
    import { goto } from "$app/navigation";

    export let slug;
    let currentUrl = "";

    onMount(() => {
        currentUrl = window.location.href;
    });

    const handleSubmit = async (event) => {
        event.preventDefault(); // предотврати стандартную отправку формы

        const form = event.target;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            slug,
            url: currentUrl,
        };

        TGMessage(data);

        alert("Спасибо! Ваша заявка отправлена.");
        goto("/thank-you"); // перенаправление на страницу благодарности
    };
</script>

<form class="form-request" on:submit={handleSubmit}>
    <h2 class="form-title">Оставить заявку</h2>

    <label class="form-label">
        <span>Имя</span>
        <input
            type="text"
            name="name"
            required
            class="form-input"
            placeholder="Ваше имя"
        />
    </label>

    <label class="form-label">
        <span>Телефон</span>
        <input
            type="tel"
            name="phone"
            required
            class="form-input"
            placeholder="+90 ..."
        />
    </label>

    <!-- Скрытые поля -->
    <input type="hidden" name="slug" value={slug} />
    <input type="hidden" name="url" value={currentUrl} />

    <button type="submit" class="form-button">Отправить</button>
</form>

<style>
    .form-request {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
        padding: var(--space-vertical-md);
        background-color: var(--color-bg);
        color: var(--color-text);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        width: 80vw;
        max-width: 400px;
    }

    .form-title {
        font-size: var(--text-lg);
        text-align: center;
    }

    .form-label {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: var(--text-sm);
    }

    .form-input {
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        font-size: var(--text-md);
        background-color: var(--color-light);
        color: var(--color-dark);
        transition: border-color var(--transition-fast);
    }

    .form-input:focus {
        border-color: var(--color-primary);
        outline: none;
    }

    .form-button {
        padding: 0.75rem 1rem;
        background-color: var(--color-primary);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-sm);
        font-size: var(--text-md);
        cursor: pointer;
        transition: background-color var(--transition-fast);
    }

    .form-button:hover {
        background-color: var(--color-primary-hover);
    }
</style>
