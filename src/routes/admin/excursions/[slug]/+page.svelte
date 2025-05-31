<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import {
        updateExcursion,
        getExcursion,
    } from "$lib/utils/excursionsActions";
    import { goto } from "$app/navigation";

    let formData = null;
    let isLoading = false;
    let error = "";

    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { excursion, translation } = await getExcursion(slug);

            // Инициализируем поля с поддержкой языков
            const initLangFields = (field, defaultValue = "") => {
                const result = {};
                ["ru", "en", "tr"].forEach((lang) => {
                    result[lang] =
                        translation.find((t) => t.lang === lang)?.[field] ??
                        defaultValue;
                });
                return result;
            };

            const initLangArrays = (field) => {
                const result = {};
                ["ru", "en", "tr"].forEach((lang) => {
                    result[lang] =
                        translation.find((t) => t.lang === lang)?.[field] ?? [];
                });
                return result;
            };

            formData = {
                ...excursion,
                title: initLangFields("title"),
                metaDescription: initLangFields("metaDescription"),
                description: initLangFields("description"),
                meetingPoint: initLangFields("meetingPoint"),
                whatYouSee: initLangArrays("whatYouSee"),
                includes: initLangArrays("includes"),
                whatToBring: initLangArrays("whatToBring"),
                tags: initLangArrays("tags"),
            };
        } catch (e) {
            error = "Ошибка при загрузке экскурсии";
            console.error(e);
        }
    });

    async function handleSubmit() {
        isLoading = true;
        try {
            // Подготовим данные для отправки
            const excursion = {
                slug: formData.slug,
                duration: formData.duration,
                groupSize: formData.groupSize,
                price: formData.price,
                distance: formData.distance,
                start: formData.start,
                discount: formData.discount,
                images: formData.images,
            };

            const translations = ["ru", "en", "tr"].map((lang) => ({
                lang,
                tourSlug: formData.slug,
                title: formData.title[lang],
                metaDescription: formData.metaDescription[lang],
                description: formData.description[lang],
                whatYouSee: formData.whatYouSee[lang],
                includes: formData.includes[lang],
                whatToBring: formData.whatToBring[lang],
                meetingPoint: formData.meetingPoint[lang],
                tags: formData.tags[lang],
            }));

            await updateExcursion(slug, { excursion, translations });
            alert("Экскурсия успешно обновлена!");
            goto("/admin");
        } catch (e) {
            error = e.message;
        } finally {
            isLoading = false;
        }
    }

    function handleArrayInput(e, lang, field) {
        formData[field][lang] = e.target.value
            .split(",")
            .map((item) => item.trim());
    }

    function handleImageInput(e) {
        formData.images = e.target.value.split(",").map((img) => img.trim());
    }
</script>

<div class="edit-page">
    <h1 class="title">Редактирование экскурсии</h1>
    {#if formData}
        <form on:submit|preventDefault={handleSubmit}>
            <label>
                Slug:
                <input type="text" bind:value={formData.slug} />
            </label>

            <label>
                Длительность (в часах):
                <input type="number" bind:value={formData.duration} />
            </label>

            <label>
                Максимальный размер группы:
                <input type="number" bind:value={formData.groupSize} />
            </label>

            <label>
                Цена (в долларах):
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

            <label>
                Изображения (URL через запятую):
                <input type="text" on:input={handleImageInput} />
            </label>

            <h2>Мультиязычные поля</h2>
            {#each ["ru", "en", "tr"] as lang}
                <fieldset>
                    <legend>{lang.toUpperCase()}</legend>

                    <label>
                        Название:
                        <input type="text" bind:value={formData.title[lang]} />
                    </label>

                    <label>
                        Meta-описание:
                        <textarea bind:value={formData.metaDescription[lang]}
                        ></textarea>
                    </label>

                    <label>
                        Описание:
                        <textarea bind:value={formData.description[lang]}
                        ></textarea>
                    </label>

                    <label>
                        Что вы увидите (через запятую):
                        <textarea
                            on:input={(e) =>
                                handleArrayInput(e, lang, "whatYouSee")}
                        ></textarea>
                    </label>

                    <label>
                        Что включено (через запятую):
                        <textarea
                            on:input={(e) =>
                                handleArrayInput(e, lang, "includes")}
                        ></textarea>
                    </label>

                    <label>
                        Что взять с собой (через запятую):
                        <textarea
                            on:input={(e) =>
                                handleArrayInput(e, lang, "whatToBring")}
                        ></textarea>
                    </label>

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
