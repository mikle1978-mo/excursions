<script>
    import {
        excursionForm,
        setExcursionForm,
        createInitialExcursionForm,
    } from "$lib/stores/excursionForm";
    import { excursionSchema } from "$lib/schemas/excursionSchema";
    import ArrayInput from "$lib/components/UI/inputs/arrayInput/ArrayInput.svelte";
    import { goto } from "$app/navigation";
    import {
        createExcursion,
        updateExcursion,
    } from "$lib/utils/excursionsActions";
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";

    export let mode = "create"; // "create" или "edit"
    export let slug = ""; // для режима "edit"

    let errors = {};
    let generalError = "";
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        errors = {};

        try {
            const validData = excursionSchema.parse($excursionForm);

            if (mode === "create") {
                await createExcursion(validData);
                alert("Экскурсия создана");
                excursionForm.set(createInitialExcursionForm());
            } else {
                await updateExcursion(slug, validData);
                alert("Изменения сохранены");
            }

            goto("/admin");
        } catch (err) {
            if (err.errors) {
                // Преобразуем zod-ошибки в объект { field: message }
                errors = err.errors.reduce((acc, e) => {
                    const field = e.path.join(".");
                    acc[field] = e.message;
                    return acc;
                }, {});
            } else {
                generalError = err.message || "Ошибка при сохранении";
            }
        } finally {
            isLoading = false;
        }
    }

    $: console.log(
        "--- Current formData ---",
        JSON.parse(JSON.stringify($excursionForm))
    );
</script>

<div class="new-page">
    <h1 class="title">
        {mode === "create" ? "Создание экскурсии" : "Редактирование экскурсии"}
    </h1>

    <form on:submit|preventDefault={handleSubmit}>
        <fieldset>
            <legend>Общая информация</legend>
            <label>
                Slug (уникальный идентификатор):
                <input type="text" bind:value={$excursionForm.slug} required />
                <ErrorMessage field="slug" {errors} />
            </label>

            <label>
                Длительность (в часах):
                <input type="number" bind:value={$excursionForm.duration} />
                <ErrorMessage field="duration" {errors} />
            </label>

            <label>
                Размер группы (макс. количество человек):
                <input type="number" bind:value={$excursionForm.groupSize} />
                <ErrorMessage field="groupSize" {errors} />
            </label>

            <label>
                Цена прогулки (в долларах):
                <input type="number" bind:value={$excursionForm.price} />
                <ErrorMessage field="price" {errors} />
            </label>

            <label>
                Расстояние (км):
                <input type="number" bind:value={$excursionForm.distance} />
                <ErrorMessage field="distance" {errors} />
            </label>

            <label>
                Время начала:
                <input type="text" bind:value={$excursionForm.start} />
                <ErrorMessage field="start" {errors} />
            </label>

            <label>
                Скидка (%):
                <input type="number" bind:value={$excursionForm.discount} />
                <ErrorMessage field="discount" {errors} />
            </label>

            <ArrayInput
                bind:value={$excursionForm.images}
                placeholder="Введите URL изображений каждый с новой строки"
                label="Изображения (URL через запятую или с новой строки)"
            />
            <ErrorMessage field="images" {errors} />
        </fieldset>

        <h2>Мультиязычные поля</h2>
        {#each ["ru", "en", "tr"] as lang}
            <fieldset>
                <legend>{lang.toUpperCase()}</legend>

                <label>
                    Название экскурсии:
                    <input
                        type="text"
                        bind:value={$excursionForm.title[lang]}
                    />
                    <ErrorMessage field={`title.${lang}`} {errors} />
                </label>

                <label>
                    Meta-описание:
                    <textarea
                        rows="5"
                        bind:value={$excursionForm.metaDescription[lang]}
                    ></textarea>
                    <ErrorMessage field={`metaDescription.${lang}`} {errors} />
                </label>

                <label>
                    Описание:
                    <textarea
                        rows="5"
                        bind:value={$excursionForm.description[lang]}
                    ></textarea>
                    <ErrorMessage field={`description.${lang}`} {errors} />
                </label>

                <label>
                    Место встречи:
                    <input
                        type="text"
                        bind:value={$excursionForm.meetingPoint[lang]}
                    /><ErrorMessage field={`meetingPoint.${lang}`} {errors} />
                </label>

                <ArrayInput
                    bind:value={$excursionForm.whatYouSee[lang]}
                    placeholder="Введите пункты каждый с новой строки"
                    label="Что вы увидите:"
                    field={`whatYouSee.${lang}`}
                    {errors}
                />

                <ArrayInput
                    bind:value={$excursionForm.includes[lang]}
                    placeholder="Введите пункты каждый с новой строки"
                    label="Что включено:"
                    field={`includes.${lang}`}
                    {errors}
                />

                <ArrayInput
                    bind:value={$excursionForm.whatToBring[lang]}
                    placeholder="Введите пункты каждый с новой строки"
                    label="Что взять с собой:"
                    field={`whatToBring.${lang}`}
                    {errors}
                />
                <ArrayInput
                    bind:value={$excursionForm.tags[lang]}
                    placeholder="Введите пункты каждый с новой строки"
                    label="Теги (через запятую):"
                    field={`tags.${lang}`}
                    {errors}
                />
            </fieldset>
        {/each}

        {#if generalError}
            <p class="error">{generalError}</p>
        {/if}

        <button type="submit" disabled={isLoading}>
            {isLoading
                ? mode === "create"
                    ? "Создание..."
                    : "Сохранение..."
                : mode === "create"
                  ? "Создать экскурсию"
                  : "Сохранить изменения"}
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
