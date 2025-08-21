<script>
    import { goto } from "$app/navigation";
    import { createFaq } from "$lib/utils/faqActions";

    let formData = {
        question: { ru: "", en: "", tr: "" },
        answer: { ru: "", en: "", tr: "" },
        order: 0,
    };

    let error = "";
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        error = "";
        try {
            await createFaq(formData);
            alert("FAQ создан");
            goto("/admin/faq");
        } catch (e) {
            error = e.message || "Ошибка при создании FAQ";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="new-page">
    <h1 class="title">Создание FAQ</h1>

    <form on:submit|preventDefault={handleSubmit}>
        <fieldset>
            <legend>Порядок (для сортировки)</legend>
            <label>
                Порядок (число):
                <input type="number" bind:value={formData.order} min="0" />
            </label>
        </fieldset>

        <h2>Мультиязычные поля</h2>
        {#each ["ru", "en", "tr"] as lang}
            <fieldset>
                <legend>{lang.toUpperCase()}</legend>

                <label>
                    Вопрос:
                    <input
                        type="text"
                        bind:value={formData.question[lang]}
                        required
                    />
                </label>

                <label>
                    Ответ:
                    <textarea bind:value={formData.answer[lang]} required
                    ></textarea>
                </label>
            </fieldset>
        {/each}

        {#if error}
            <p class="error">{error}</p>
        {/if}

        <button type="submit" disabled={isLoading}>
            {isLoading ? "Создание..." : "Создать FAQ"}
        </button>
    </form>
</div>

<style>
    .new-page {
        display: grid;
        grid-template-columns: 1fr;
        align-items: flex-start;
        padding: 0px;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-top: 1px solid var(--color-gray-500);
        border-bottom: 1px solid var(--color-gray-500);
    }
    form {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
        background: var(--color-bg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }

    .title {
        margin-top: var(--space-vertical-md);
        font-size: var(--text-lg);
        color: var(--color-text);
    }
    h2 {
        margin-top: var(--space-vertical-md);
        font-size: var(--text-lg);
        color: var(--color-text);
    }

    label {
        display: flex;
        flex-direction: column;
        font-size: var(--text-sm);
        gap: 0.3rem;
    }

    input,
    textarea {
        width: 100%;
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

    input:focus,
    textarea:focus {
        font-size: 16px;
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(74, 201, 126, 0.3);
    }

    fieldset {
        border: 1px solid var(--color-gray-300);
        padding: var(--space-vertical-sm);
        border-radius: var(--radius-md);
        background-color: var(--color-bg);
    }
    legend {
        font-weight: bolder;
        text-decoration: underline;
    }

    button {
        padding: 0.75rem;
        background-color: var(--color-primary);
        color: var(--color-text);
        font-size: var(--text-md);
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        transition: background-color var(--transition-fast);
    }

    button:hover {
        background-color: var(--color-primary-hover);
    }

    button:disabled {
        background-color: var(--color-gray-400);
        cursor: not-allowed;
    }

    .error {
        color: var(--color-error);
        font-size: var(--text-sm);
    }

    @media (prefers-color-scheme: dark) {
        input,
        textarea {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
