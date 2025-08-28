<script>
    import { onMount } from "svelte";
    import MyButton from "$lib/components/UI/buttons/MyButton.svelte";
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import FormField from "$lib/components/UI/inputs/FormField.svelte";
    import { goto } from "$app/navigation";
    import {
        createFormStore,
        setFormData,
        resetForm,
    } from "$lib/stores/universalFormStore";
    import { createItem, updateItem } from "$lib/utils/itemsActions.js";

    export let steps = []; // конфиг шагов и полей
    export let schema; // Zod-схема (ZodObject)
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

            console.log("*************", err);
            const issues = err.errors ?? err.issues ?? [];
            errors = mapZodErrors(issues);

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

    function mapZodErrors(issues) {
        const result = {};
        for (const e of issues) {
            let target = result;
            for (let i = 0; i < e.path.length - 1; i++) {
                const key = e.path[i];
                target[key] = target[key] || {};
                target = target[key];
            }
            target[e.path[e.path.length - 1]] = { message: e.message };
        }
        return result;
    }

    async function handleSubmit() {
        isLoading = true;
        errors = {};
        generalError = "";

        try {
            const validData = schema.parse(currentForm);

            if (mode === "create") {
                await createItem(type, validData);
                alert("Создано успешно");
                resetForm(form, initializeForm(), type, "new");
                goto(redirectTo);
            } else {
                await updateItem(type, slug, validData);
                alert("Изменения сохранены");
                resetForm(form, initializeForm(), type, slug);
                goto(redirectTo);
            }
            // например, редирект или уведомление
        } catch (err) {
            const issues = err.errors ?? err.issues ?? [];
            errors = mapZodErrors(issues);
            generalError =
                err.message || JSON.stringify(err) || "Ошибка при сохранении";
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
        <button
            on:click={() => goto(redirectTo)}
            type="button"
            class="close-btn"
        >
            ×
        </button>
    </div>

    <!-- Текущий шаг -->
    <div class="wizard-content">
        {#if currentStepObj}
            <fieldset>
                <legend>{currentStepObj.title}</legend>

                {#each currentStepObj.fields as field}
                    {#if field.localized}
                        {#each Object.keys($form[field.name] ?? Object.fromEntries(SUPPORTED_LANGUAGES.map( (l) => [l, ""] ))) as lang}
                            <FormField
                                field={{
                                    ...field,
                                    label: `${field.label} (${lang.toUpperCase()})`,
                                    localized: false,
                                }}
                                bind:value={$form[field.name][lang]}
                                errors={errors[field.name]?.[lang] ?? {}}
                                fieldName={`${field.name}.${lang}`}
                            />
                        {/each}
                    {:else}
                        <FormField
                            {field}
                            bind:value={$form[field.name]}
                            errors={errors[field.name] ?? {}}
                            fieldName={field.name}
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
        align-items: center;
        height: 100%;
        position: relative;
    }

    /* header фиксированный */
    .wizard-header {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: var(--space-vertical-sm) 0;
        background: var(--color-bg);
        border-bottom: 1px solid var(--color-gray-300);
        position: sticky;
        top: 0;
        z-index: 10;
    }

    /* контент прокручивается */
    .wizard-content {
        width: 100%;
        flex: 1;
        overflow-y: auto;
        padding: var(--space-vertical-md) 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        /* Важно для скролла */
        min-height: 0;
    }

    /* footer фиксированный */
    .wizard-footer {
        flex-shrink: 0;
        display: flex;
        gap: 0.75rem;
        align-items: center;
        justify-content: space-between;
        padding: var(--space-vertical-sm) 0;
        background: var(--color-bg);
        border-top: 1px solid var(--color-gray-300);
        position: sticky;
        bottom: 0;
        z-index: 10;
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
        margin: 0;
    }

    legend {
        font-weight: bolder;
        text-decoration: underline;
        padding: 0 var(--space-horizontal-xs);
    }

    .error {
        color: var(--color-error);
        font-size: var(--text-sm);
        text-align: center;
        margin-top: var(--space-vertical-xs);
    }

    .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        font-size: 1.5rem;
        width: calc(var(--text-md) * 1.5);
        height: calc(var(--text-md) * 1.5);
        border: none;
        padding: 0;
        border-radius: var(--radius-full);
        color: var(--color-gray-500);
        cursor: pointer;
        transition: all var(--transition-fast);
    }

    .close-btn:hover,
    .close-btn:focus {
        color: var(--color-error);
        background: var(--color-gray-200);
    }

    /* Для темной темы */
    @media (prefers-color-scheme: dark) {
        .wizard-header,
        .wizard-footer {
            background: var(--color-dark);
            border-color: var(--color-gray-700);
        }

        fieldset {
            border-color: var(--color-gray-700);
            background: var(--color-dark);
        }
    }

    /* Адаптивность для мобильных */
    @media (max-width: 768px) {
        .wizard-header {
            padding: var(--space-vertical-xs) 0;
        }

        .wizard-content {
            padding: var(--space-vertical-sm) 0;
        }

        .wizard-footer {
            padding: var(--space-vertical-xs) 0;
        }

        .steps {
            gap: 0.25rem;
        }

        fieldset {
            padding: var(--space-vertical-xs);
        }
    }
</style>
