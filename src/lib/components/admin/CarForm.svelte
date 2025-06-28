<script>
    import {
        carForm,
        setCarForm,
        createInitialCarForm,
        resetCarForm,
    } from "$lib/stores/carForm";
    import { carSchema } from "$lib/schemas/carSchema";
    import ArrayInput from "$lib/components/UI/inputs/arrayInput/ArrayInput.svelte";
    import { goto } from "$app/navigation";
    import { createCar, updateCar } from "$lib/utils/carsActions";
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    import { onMount } from "svelte";
    import ImageUploader from "$lib/components/UI/inputs/ImageUploader/ImageUploader.svelte";

    export let mode = "create"; // "create" или "edit"
    export let slug = ""; // для режима "edit"

    let errors = {};
    let generalError = "";
    let isLoading = false;

    async function handleSubmit() {
        isLoading = true;
        errors = {};

        try {
            const validData = carSchema.parse($carForm);

            if (mode === "create") {
                await createCar(validData);
                alert("Машина создана");
                carForm.set(createInitialCarForm());
            } else {
                await updateCar(slug, validData);
                alert("Изменения сохранены");
            }

            goto("/admin/cars");
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

    function handleReset() {
        if (confirm("Вы уверены, что хотите очистить форму?")) {
            resetCarForm();
        }
    }

    onMount(() => {
        if (mode === "create") {
            resetCarForm(); // сбрасываем всё к начальному состоянию
        }
    });

    $: console.log(
        "--- Current formData ---",
        JSON.parse(JSON.stringify($carForm))
    );
</script>

<div class="new-page">
    <div class="title-row">
        <h1 class="title">
            {mode === "create" ? "Создание машины" : "Редактирование машины"}
        </h1>
        <button
            type="button"
            style="background: var(--color-error);"
            on:click={handleReset}>Очистить</button
        >
    </div>

    <form on:submit|preventDefault={handleSubmit}>
        <fieldset>
            <legend>Общая информация</legend>

            <label class="checkbox">
                <input type="checkbox" bind:checked={$carForm.active} />
                Активна (отображать на сайте)
                <ErrorMessage field="active" {errors} />
            </label>

            <label
                >Slug (уникальный идентификатор):
                <input type="text" bind:value={$carForm.slug} required />
                <ErrorMessage field="slug" {errors} />
            </label>

            <label
                >Марка (мерседес, ауди и т.д.):
                <input type="text" bind:value={$carForm.brand} />
                <ErrorMessage field="brand" {errors} />
            </label>

            <label
                >Модель (например, A-Class):
                <input type="text" bind:value={$carForm.model} />
                <ErrorMessage field="model" {errors} />
            </label>

            <label
                >Год:
                <input type="number" bind:value={$carForm.year} />
                <ErrorMessage field="year" {errors} />
            </label>

            <label
                >Количество мест:
                <input type="number" bind:value={$carForm.seats} />
                <ErrorMessage field="seats" {errors} />
            </label>

            <label
                >Количество дверей:
                <input type="number" bind:value={$carForm.doors} />
                <ErrorMessage field="doors" {errors} />
            </label>

            <label
                >Объем багажника (в литрах):
                <input type="number" bind:value={$carForm.luggage} />
                <ErrorMessage field="luggage" {errors} />
            </label>

            <label
                >Тип топлива:
                <select bind:value={$carForm.fuel}>
                    <option value="" disabled selected>Выберите тип</option>
                    <option value="petrol">Бензин</option>
                    <option value="diesel">Дизель</option>
                    <option value="hybrid">Гибрид</option>
                    <option value="electric">Электро</option>
                </select>
                <ErrorMessage field="fuel" {errors} />
            </label>

            <label
                >Коробка передач:
                <select bind:value={$carForm.transmission}>
                    <option value="" disabled selected>Выберите тип</option>
                    <option value="automatic">Автомат</option>
                    <option value="manual">Механика</option>
                </select>
                <ErrorMessage field="transmission" {errors} />
            </label>

            <label
                >Тип кузова:
                <select bind:value={$carForm.bodyType}>
                    <option value="" disabled selected>Выберите тип</option>
                    <option value="sedan">Седан</option>
                    <option value="suv">Внедорожник</option>
                    <option value="hatchback">Хэтчбек</option>
                    <option value="van">Фургон</option>
                    <option value="pickup">Пикап</option>
                    <option value="convertible">Кабриолет</option>
                </select>
                <ErrorMessage field="bodyType" {errors} />
            </label>

            <label
                >Цена аренды:
                <input type="number" bind:value={$carForm.price} />
                <ErrorMessage field="price" {errors} />
            </label>

            <label
                >Тип цены:
                <select bind:value={$carForm.priceType}>
                    <option value="" disabled selected>Выберите тип</option>
                    <option value="per_day">за день</option>
                    <option value="per_hour">за час</option>
                    <option value="per_week">за неделю</option>
                </select>
                <ErrorMessage field="priceType" {errors} />
            </label>

            <label
                >Скидка (%):
                <input type="number" bind:value={$carForm.discount} />
            </label>

            <label
                >Ограничение по пробегу (км/день):
                <input type="number" bind:value={$carForm.distanceLimit} />
                <ErrorMessage field="distanceLimit" {errors} />
            </label>

            <label
                >Минимальный срок аренды:
                <input
                    type="number"
                    bind:value={$carForm.minRentalPeriodValue}
                />
                <select bind:value={$carForm.minRentalPeriodUnit}>
                    <option value="hours">Часы</option>
                    <option value="days">Дни</option>
                </select>
            </label>

            <label>
                <input type="checkbox" bind:checked={$carForm.withDriver} />
                Можно с водителем
                <ErrorMessage field="withDriver" {errors} />
            </label>

            <ImageUploader
                bind:images={$carForm.images}
                label="Фотографии машины"
                folder={`cars/${$carForm.slug}`}
                {errors}
            />
        </fieldset>

        <h2>Мультиязычные поля</h2>
        {#each ["ru", "en", "tr"] as lang}
            <fieldset>
                <legend>{lang.toUpperCase()}</legend>

                <label
                    >Название:
                    <input type="text" bind:value={$carForm.title[lang]} />
                    <ErrorMessage field={`title.${lang}`} {errors} />
                </label>

                <label
                    >Meta-описание:
                    <textarea
                        rows="3"
                        bind:value={$carForm.metaDescription[lang]}
                    ></textarea>
                    <ErrorMessage field={`metaDescription.${lang}`} {errors} />
                </label>

                <label
                    >Описание:
                    <textarea rows="5" bind:value={$carForm.description[lang]}
                    ></textarea>
                    <ErrorMessage field={`description.${lang}`} {errors} />
                </label>

                <label
                    >Условия перерасхода лимитов:
                    <textarea
                        rows="5"
                        bind:value={$carForm.extraTimePolicy[lang]}
                    ></textarea>
                    <ErrorMessage field={`extraTimePolicy.${lang}`} {errors} />
                </label>
                <label
                    >Топливная политика:
                    <textarea rows="5" bind:value={$carForm.fuelPolicy[lang]}
                    ></textarea>
                    <ErrorMessage field={`fuelPolicy.${lang}`} {errors} />
                </label>

                <ArrayInput
                    bind:value={$carForm.requiredDocuments[lang]}
                    label="ОБязательные документы:"
                    field={`requiredDocuments.${lang}`}
                    {errors}
                />
                <ErrorMessage field={`requiredDocuments.${lang}`} {errors} />

                <ArrayInput
                    bind:value={$carForm.rentalConditions[lang]}
                    label="Условия аренды:"
                    field={`rentalConditions.${lang}`}
                    {errors}
                />
                <ArrayInput
                    bind:value={$carForm.insuranceDescription[lang]}
                    label="Описание страховки:"
                    field={` insuranceDescription.${lang}`}
                    {errors}
                />
                <ArrayInput
                    bind:value={$carForm.insuranceExclusions[lang]}
                    label="Исключения из страховки:"
                    field={`insuranceExclusions.${lang}`}
                    {errors}
                />
                <ArrayInput
                    bind:value={$carForm.accidentInstructions[lang]}
                    label="Инструкции при аварии:"
                    field={`accidentInstructions.${lang}`}
                    {errors}
                />
                <ArrayInput
                    bind:value={$carForm.includes[lang]}
                    label="Что включено"
                    field={`includes.${lang}`}
                    {errors}
                />

                <ArrayInput
                    bind:value={$carForm.whatToBring[lang]}
                    label="Что взять с собой"
                    field={`whatToBring.${lang}`}
                    {errors}
                />

                <ArrayInput
                    bind:value={$carForm.tags[lang]}
                    label="Теги"
                    field={`tags.${lang}`}
                    {errors}
                />

                <ArrayInput
                    bind:value={$carForm.notes[lang]}
                    label="Доп. условия"
                    field={`notes.${lang}`}
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
                  ? "Создать машину"
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

    .title-row {
        margin-top: var(--space-vertical-md);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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
    select,
    option,
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
    .checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: var(--text-md);
        color: var(--color-text);
        padding: 0.3rem 0;
    }

    .checkbox input[type="checkbox"] {
        width: 1.1rem;
        height: 1.1rem;
        accent-color: var(
            --color-primary
        ); /* поддерживается во всех современных браузерах */
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {
        input,
        textarea {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
