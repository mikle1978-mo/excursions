<script>
    import { onMount } from "svelte";
    import TGMessage from "$lib/helpers/tgMessage";
    import { goto } from "$app/navigation";
    import { locale } from "$lib/stores/locale";
    import { get } from "svelte/store";
    import { form_list } from "$lib/i18n/form_list";

    export let slug;
    let currentUrl = "";

    onMount(() => {
        currentUrl = window.location.href;
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            slug,
            url: currentUrl,
        };

        TGMessage(data);

        alert(form_list.alert[$locale]);
        const currentLocale = get(locale);
        goto(`/${currentLocale}/thanks`);
    };
</script>

<form class="form-request" on:submit={handleSubmit}>
    <h2 class="form-title">{form_list.title[$locale]}</h2>

    <label class="form-label">
        <span>{form_list.form_name[$locale]}</span>
        <input
            type="text"
            name="name"
            required
            class="form-input"
            placeholder={form_list.name_placeholder[$locale]}
        />
    </label>

    <label class="form-label">
        <span>{form_list.form_phone[$locale]}</span>
        <input
            type="tel"
            name="phone"
            required
            class="form-input"
            placeholder="+ ..."
        />
    </label>

    <!-- Скрытые поля -->
    <input type="hidden" name="slug" value={slug} />
    <input type="hidden" name="url" value={currentUrl} />

    <button type="submit" class="form-button"
        >{form_list.submit[$locale]}</button
    >
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
        padding: 0.5rem 0.75rem;
        font-size: var(--text-md);
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-light);
        color: var(--color-text);
        transition:
            border var(--transition-fast),
            box-shadow var(--transition-fast);
    }

    .form-input:focus {
        font-size: 16px;
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(74, 201, 126, 0.3);
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

    @media (prefers-color-scheme: dark) {
        .form-input {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
