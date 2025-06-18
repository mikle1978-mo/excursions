<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { getFaq, updateFaq } from "$lib/utils/faqActions";

    let formData = null;
    let isLoading = false;
    let error = "";

    const { id } = $page.params;

    onMount(async () => {
        try {
            const faq = await getFaq(id);

            formData = {
                id: faq._id,
                itemSlug: faq.itemSlug,
                question: {
                    ru: faq.question?.ru ?? "",
                    en: faq.question?.en ?? "",
                    tr: faq.question?.tr ?? "",
                },
                answer: {
                    ru: faq.answer?.ru ?? "",
                    en: faq.answer?.en ?? "",
                    tr: faq.answer?.tr ?? "",
                },
                order: faq.order ?? 0,
            };
        } catch (e) {
            error = "Ошибка при загрузке FAQ";
            console.error(e);
        }
    });

    async function handleSubmit() {
        isLoading = true;
        error = "";

        try {
            await updateFaq(formData.id, {
                itemSlug: formData.itemSlug,
                question: formData.question,
                answer: formData.answer,
                order: formData.order ?? 0,
            });

            alert("FAQ обновлен");
            goto("/admin/faq");
        } catch (e) {
            error = e.message || "Ошибка при обновлении FAQ";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="edit-page">
    <h1 class="title">Редактирование FAQ</h1>

    {#if formData}
        <form on:submit|preventDefault={handleSubmit}>
            <fieldset>
                <legend>Порядок</legend>
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
                        />
                    </label>

                    <label>
                        Ответ:
                        <textarea bind:value={formData.answer[lang]}></textarea>
                    </label>
                </fieldset>
            {/each}

            {#if error}
                <p class="error">{error}</p>
            {/if}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Сохранение..." : "Сохранить изменения"}
            </button>
        </form>
    {:else}
        <p>Загрузка данных...</p>
    {/if}
</div>

<style>
    .edit-page {
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

    textarea {
        height: auto;
        overflow-y: hidden;
        resize: vertical;
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
