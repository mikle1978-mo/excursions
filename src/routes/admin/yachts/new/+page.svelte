<script>
    import { goto } from "$app/navigation";
    import { createYacht } from "$lib/utils/yachtsActions";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";
    import ArrayInput from "$lib/components/UI/inputs/arrayInput/ArrayInput.svelte";

    let formData = {
        slug: "",
        duration: "",
        groupSize: "",
        price: "",
        distance: "",
        start: "",
        discount: "",
        images: [],
        days: [],

        title: { ru: "", en: "", tr: "" },
        metaDescription: { ru: "", en: "", tr: "" },
        description: { ru: "", en: "", tr: "" },
        whatYouSee: { ru: [], en: [], tr: [] },
        includes: { ru: [], en: [], tr: [] },
        whatToBring: { ru: [], en: [], tr: [] },
        meetingPoint: { ru: "", en: "", tr: "" },
        tags: { ru: [], en: [], tr: [] },
    };

    let error = "";
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        try {
            console.log("Отправляемые данные:", formData);
            const result = await createYacht(formData);
            console.log("Результат создания яхты:", result);
            alert("Яхта создана");
            goto(`/admin`);
        } catch (e) {
            error = e.message;
        } finally {
            isLoading = false;
        }
    }

    onMount(() => {
        if (browser) {
            try {
                const savedData = localStorage.getItem("yachtFormDraft");
                if (savedData) {
                    const parsed = JSON.parse(savedData);
                    if (parsed && typeof parsed === "object") {
                        // Обновляем поля вручную, чтобы сохранить реактивность
                        Object.assign(formData, parsed);

                        // Вложенные объекты тоже обновляем вручную
                        for (const key of [
                            "title",
                            "metaDescription",
                            "description",
                            "meetingPoint",
                        ]) {
                            if (parsed[key]) {
                                Object.assign(formData[key], parsed[key]);
                            }
                        }

                        for (const key of [
                            "whatYouSee",
                            "includes",
                            "whatToBring",
                            "tags",
                        ]) {
                            if (parsed[key]) {
                                for (const lang of ["ru", "en", "tr"]) {
                                    formData[key][lang] =
                                        parsed[key][lang] ?? [];
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.error("Ошибка загрузки из localStorage", e);
                localStorage.removeItem("yachtFormDraft");
            }
        }
    });

    $: {
        if (browser) {
            try {
                localStorage.setItem(
                    "yachtFormDraft",
                    JSON.stringify(formData)
                );
            } catch (e) {
                console.error("Ошибка сохранения в localStorage", e);
            }
        }
    }

    $: {
        console.log("--- Current formData.images ---");

        console.log(JSON.parse(JSON.stringify(formData)));
    }
</script>

<div class="new-page">
    <h1 class="title">Создание яхт</h1>

    <form on:submit|preventDefault={handleSubmit}>
        <fieldset>
            <legend>Общая информация</legend>
            <label>
                Slug (уникальный идентификатор):
                <input type="text" bind:value={formData.slug} required />
            </label>

            <label>
                Длительность (в часах):
                <input type="number" bind:value={formData.duration} />
            </label>

            <label>
                Вместительность:
                <input type="number" bind:value={formData.groupSize} />
            </label>

            <label>
                Цена прогулки (в долларах):
                <input type="number" bind:value={formData.price} />
            </label>

            <label>
                Расстояние (км):
                <input type="number" bind:value={formData.distance} />
            </label>

            <label>
                Время начала:
                <input type="text" bind:value={formData.start} />
            </label>

            <label>
                Скидка (%):
                <input type="number" bind:value={formData.discount} />
            </label>

            <ArrayInput
                bind:value={formData.images}
                placeholder="Введите URL изображений через запятую или с новой строки"
                label="Изображения (URL через запятую или с новой строки)"
            />
        </fieldset>

        <h2>Мультиязычные поля</h2>
        {#each ["ru", "en", "tr"] as lang}
            <fieldset>
                <legend>{lang.toUpperCase()}</legend>

                <label>
                    Название яхты:
                    <input type="text" bind:value={formData.title[lang]} />
                </label>

                <label>
                    Meta-описание:
                    <textarea
                        rows="5"
                        bind:value={formData.metaDescription[lang]}
                    ></textarea>
                </label>

                <label>
                    Описание:
                    <textarea rows="5" bind:value={formData.description[lang]}
                    ></textarea>
                </label>

                <ArrayInput
                    bind:value={formData.whatYouSee[lang]}
                    placeholder="Введите пункты через запятую или с новой строки"
                    label="Что вы увидите:"
                />

                <ArrayInput
                    bind:value={formData.includes[lang]}
                    placeholder="Введите пункты через запятую или с новой строки"
                    label="Что включено:"
                />

                <ArrayInput
                    bind:value={formData.whatToBring[lang]}
                    placeholder="Введите пункты через запятую или с новой строки"
                    label="Что взять с собой:"
                />

                <label>
                    Место встречи:
                    <input
                        type="text"
                        bind:value={formData.meetingPoint[lang]}
                    />
                </label>

                <label>
                    Теги (через запятую):
                    <input
                        type="text"
                        on:input={(e) => handleArrayInput(e, lang, "tags")}
                    />
                </label>
            </fieldset>
        {/each}

        {#if error}
            <p class="error">{error}</p>
        {/if}

        <button type="submit" disabled={isLoading}>
            {isLoading ? "Создание..." : "Создать экскурсию"}
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
