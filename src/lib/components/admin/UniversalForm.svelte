<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    import CheckBoxInput from "$lib/components/UI/inputs/checkboxInput/CheckBoxInput.svelte";
    import TextInput from "$lib/components/UI/inputs/textInput/TextInput.svelte";
    import TexrAreaInput from "$lib/components/UI/inputs/textareaInput/TexrAreaInput.svelte";
    import NumberInput from "$lib/components/UI/inputs/numberInput/NumberInput.svelte";
    import SelectInput from "$lib/components/UI/inputs/selectInput/SelectInput.svelte";
    import ArrayInput from "$lib/components/UI/inputs/arrayInput/ArrayInput.svelte";
    import ImageUploader from "$lib/components/UI/inputs/ImageUploader/ImageUploader.svelte";
    import DateInput from "$lib/components/UI/inputs/dateInput/DateInput.svelte";
    import MyButton from "$lib/components/UI/buttons/MyButton.svelte";
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    // Получение дефолтов из схемы и конфигурации
    import { getDefaultValue } from "$lib/utils/getDefaultSchemaValue";
    import { createLocalizedField } from "$lib/utils/createLocalizedField";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";
    import {
        createFormStore,
        setFormData,
        resetForm,
    } from "$lib/stores/universalFormStore";

    export let steps = []; // конфиг шагов и полей
    export let schema; // Zod-схема (ZodObject)
    export let createFn; // функция создания
    export let updateFn; // функция обновления
    export let mode = "create"; // create | edit
    export let slug = ""; // для edit
    export let initialData = null; // добавляем проп
    export let type = ""; // тип сущности (excursion, tour и т.д.)

    // Инициализация при mount или при изменении initialData
    let form = createFormStore(type, slug, initializeForm());

    let errors = {};
    let generalError = "";
    let isLoading = false;
    let redirectTo = `/admin/${type}s`;

    // текущее положение в шагах
    let currentStep = 0;
    $: totalSteps = steps?.length ?? 0;
    $: currentStepObj = steps?.[currentStep];
    $: currentForm = $form;

    function initializeForm() {
        const formData = {};

        steps.forEach((step) => {
            step.fields.forEach((field) => {
                if (field.localized) {
                    // если initialData есть — берём её, иначе дефолт или пустой объект языков
                    formData[field.name] =
                        initialData?.[field.name] ?? field.default ?? {};
                    // теперь гарантируем, что есть все языки
                    SUPPORTED_LANGUAGES.forEach((lang) => {
                        if (!(lang in formData[field.name])) {
                            formData[field.name][lang] = "";
                        }
                    });
                } else {
                    formData[field.name] =
                        initialData?.[field.name] ??
                        field.default ??
                        (field.type === "array"
                            ? []
                            : field.type === "number"
                              ? 0
                              : "");
                }
            });
        });

        return formData;
    }

    // Для дебага
    $: console.log("Form initialized with:", $form);

    onMount(async () => {
        if (mode === "edit" && slug && initialData) {
            setFormData(form, initialData, type, slug);
        }
    });

    // Вспомог: взять уникальные базовые имена полей для шага (title, price и т.д.)
    function getBaseNamesForStep(step) {
        return Array.from(
            new Set(step.fields.map((f) => f.name.split(".")[0]))
        );
    }

    // Валидировать только поля текущего шага (partial schema)
    async function validateCurrentStep() {
        errors = {};
        generalError = "";

        const baseNames = getBaseNamesForStep(currentStepObj);

        // Построим объект с нужными ключами
        const dataToValidate = {};
        for (const key of baseNames) {
            dataToValidate[key] = currentForm[key];
        }

        try {
            // Берём "частичную" схему: подмножество полей по baseNames
            // если schema.pick доступен (ZodObject)
            let partialSchema;
            if (schema && typeof schema.pick === "function") {
                const pickMap = Object.fromEntries(
                    baseNames.map((k) => [k, true])
                );
                partialSchema = schema.pick(pickMap).partial();
            } else {
                // fallback: валидировать целиком (плохой вариант), но обычно schema.pick есть
                partialSchema = schema;
            }

            partialSchema.parse(dataToValidate);
            return true;
        } catch (err) {
            // поддержка разных форматов ZodError: err.errors или err.issues
            const issues = err.errors ?? err.issues ?? [];
            errors = issues.reduce((acc, e) => {
                const path = (e.path || []).join(".");
                acc[path] = e.message;
                return acc;
            }, {});
            return false;
        }
    }

    // Переход к следующему шагу с валидацией текущего
    async function nextStep() {
        if (!currentStepObj) return;

        const ok = await validateCurrentStep();
        if (!ok) return;

        if (currentStep < totalSteps - 1) {
            currentStep += 1;
            // можно сфокусировать первый инпут — позже
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // последний шаг — сабмит всей формы
            await handleSubmit();
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep -= 1;
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        if (currentStep === 0) {
            goto(redirectTo); // редирект на список, если это первый шаг
        }
    }

    async function handleSubmit() {
        isLoading = true;
        errors = {};
        generalError = "";

        try {
            const validData = schema.parse(currentForm);
            console.log("Valid data for submission:", validData, currentForm);

            if (mode === "create") {
                await createFn(validData);
                alert("Создано успешно");
                resetForm(form, initializeForm(), type, "new");
                goto(redirectTo);
            } else {
                await updateFn(slug, validData);
                alert("Изменения сохранены");
                resetForm(form, initializeForm(), type, slug);
                goto(redirectTo);
            }
            // например, редирект или уведомление
        } catch (err) {
            const issues = err.errors ?? err.issues ?? [];
            errors = issues.reduce((acc, e) => {
                const path = (e.path || []).join(".");
                acc[path] = e.message;
                return acc;
            }, {});
            generalError = err.message || "Ошибка при сохранении";
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="wizard">
    <!-- Прогресс / заголовок шага -->
    <div class="wizard-header">
        <div class="steps">
            {#each steps as s, i}
                <MyButton
                    width="width-auto"
                    size="xs"
                    type="button"
                    variant={i === currentStep ? "primary" : "outline"}
                    onclick={() => (currentStep = i)}
                    aria-current={i === currentStep ? "step" : undefined}
                >
                    {i + 1}. {s.title}
                </MyButton>
            {/each}
        </div>
    </div>

    <!-- Текущий шаг -->
    <div class="wizard-content">
        {#if currentStepObj}
            <fieldset>
                <legend>{currentStepObj.title}</legend>

                {#each currentStepObj.fields as field}
                    {#if field.localized}
                        {#each Object.keys($form[field.name] ?? Object.fromEntries(SUPPORTED_LANGUAGES.map( (l) => [l, ""] ))) as lang}
                            {#if field.type === "checkbox"}
                                <CheckBoxInput
                                    bind:value={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {:else if field.type === "date"}
                                <DateInput
                                    bind:value={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {:else if field.type === "textarea"}
                                <TexrAreaInput
                                    bind:value={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {:else if field.type === "select"}
                                <SelectInput
                                    bind:value={$form[field.name][lang]}
                                    options={field.options}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {:else if field.type === "number"}
                                <NumberInput
                                    bind:value={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {:else if field.type === "text"}
                                <TextInput
                                    bind:value={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {:else if field.type === "array"}
                                <ArrayInput
                                    bind:value={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    placeholder={field.placeholder}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {:else if field.type === "imageUploader"}
                                <ImageUploader
                                    bind:images={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    folder={field.folder}
                                />
                            {:else}
                                <TextInput
                                    bind:value={$form[field.name][lang]}
                                    label={`${field.label} (${lang.toUpperCase()})`}
                                    field={`${field.name}.${lang}`}
                                    {errors}
                                />
                            {/if}
                        {/each}
                    {:else if field.type === "checkbox"}
                        <CheckBoxInput
                            bind:value={$form[field.name]}
                            label={field.label}
                            field={field.name}
                            {errors}
                        />
                    {:else if field.type === "date"}
                        <DateInput
                            bind:value={$form[field.name]}
                            label={field.label}
                            field={field.name}
                            {errors}
                        />
                    {:else if field.type === "textarea"}
                        <TexrAreaInput
                            bind:value={$form[field.name]}
                            label={field.label}
                            field={field.name}
                            {errors}
                        />
                    {:else if field.type === "select"}
                        <SelectInput
                            bind:value={$form[field.name]}
                            options={field.options}
                            label={field.label}
                            field={field.name}
                            {errors}
                        />
                    {:else if field.type === "number"}
                        <NumberInput
                            bind:value={$form[field.name]}
                            label={field.label}
                            field={field.name}
                            {errors}
                        />
                    {:else if field.type === "text"}
                        <TextInput
                            bind:value={$form[field.name]}
                            label={field.label}
                            field={field.name}
                            {errors}
                        />
                    {:else if field.type === "array"}
                        <ArrayInput
                            bind:value={$form[field.name]}
                            label={field.label}
                            placeholder={field.placeholder}
                            field={field.name}
                            {errors}
                        />
                    {:else if field.type === "imageUploader"}
                        <ImageUploader
                            bind:images={$form[field.name]}
                            label={field.label}
                            folder={field.folder}
                        />
                    {:else}
                        <TextInput
                            bind:value={$form[field.name]}
                            label={field.label}
                            field={field.name}
                            {errors}
                        />
                    {/if}
                {/each}
            </fieldset>
        {/if}
    </div>

    <!-- Навигация по шагам -->
    <div class="wizard-footer">
        <MyButton
            width="width-auto"
            variant="outline"
            size="xs"
            onclick={prevStep}
        >
            Назад
        </MyButton>

        <div class="step-counter">
            Шаг {currentStep + 1} из {totalSteps}
        </div>

        <MyButton
            width="width-auto"
            size="xs"
            onclick={nextStep}
            disabled={isLoading}
        >
            {#if currentStep < totalSteps - 1}
                Далее
            {:else if isLoading}
                Сохранение...
            {:else}
                {mode === "create" ? "Создать" : "Сохранить"}
            {/if}
        </MyButton>
    </div>

    {#if generalError}
        <p class="error">{generalError}</p>
    {/if}
</div>

<style>
    .wizard {
        display: flex;
        flex-direction: column;
        height: 100%; /* чтобы занять всю доступную высоту */
        overflow: hidden;
    }

    /* header остаётся сверху */
    .wizard-header {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    /* контент прокручивается */
    .wizard-content {
        flex: 1 1 auto;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: var(--space-vertical-xs) 0;
    }

    /* footer закреплён внизу */
    .wizard-footer {
        flex-shrink: 0;
        display: flex;
        gap: 0.75rem;
        align-items: center;
        justify-content: space-between;
        background-color: var(
            --color-bg
        ); /* чтобы не прилипал контент под низ */
    }

    .steps {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    fieldset {
        border: 1px solid var(--color-gray-300);
        padding: var(--space-vertical-sm);
        border-radius: var(--radius-md);
        background-color: var(--color-bg);
        font-size: var(--text-xs);
    }
    legend {
        font-weight: bolder;
        text-decoration: underline;
    }

    .error {
        color: var(--color-error);
        font-size: var(--text-sm);
    }
</style>
