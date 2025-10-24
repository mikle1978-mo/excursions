<script>
    import MyButton from "$lib/components/UI/buttons/MyButton.svelte";
    import FormField from "$lib/components/admin/FormField.svelte";
    import { goto } from "$app/navigation";
    import { createFormStore, resetForm } from "$lib/stores/universalFormStore";
    import { createItem, updateItem } from "$lib/utils/itemsActions.js";

    export let steps = [];
    export let schema;
    export let mode = "create"; // create | edit
    export let slug = "";

    export let initialData = null;
    export let type = "";

    let errors = {};
    let generalError = "";
    let isLoading = false;
    let redirectTo = `/admin/${type}`;

    let currentStep = 0;
    $: totalSteps = steps?.length ?? 0;
    $: currentStepObj = steps?.[currentStep];

    function mergeDefaultsAndData(defaults, data) {
        if (Array.isArray(defaults) && Array.isArray(data)) {
            return data; // при редактировании массивы лучше просто заменить
        }

        if (
            typeof defaults === "object" &&
            defaults !== null &&
            typeof data === "object" &&
            data !== null
        ) {
            const result = structuredClone(defaults);
            for (const key of Object.keys(data)) {
                result[key] =
                    key in defaults
                        ? mergeDefaultsAndData(defaults[key], data[key])
                        : structuredClone(data[key]);
            }
            return result;
        }

        return data !== undefined ? data : defaults;
    }

    function initializeForm() {
        if (!steps) throw new Error("Steps не переданы в форму");

        const defaults = {};
        steps.forEach((step) => {
            step.fields.forEach((field) => {
                defaults[field.name] = structuredClone(field.default);
            });
        });

        if (mode === "edit" && initialData) {
            return mergeDefaultsAndData(defaults, initialData);
        }

        return defaults;
    }

    let form = createFormStore(type, slug, initializeForm());

    $: if (mode === "edit" && initialData) {
        const merged = initializeForm();
        resetForm(form, merged, type, slug);
    }

    $: currentForm = $form;
    $: console.log("Current Form Data:", currentForm);

    async function validateCurrentStep() {
        errors = {};
        generalError = "";

        if (!currentStepObj) return true;

        const baseNames = Array.from(
            new Set(currentStepObj.fields.map((f) => f.name.split(".")[0]))
        );
        const dataToValidate = {};
        for (const key of baseNames) {
            dataToValidate[key] = currentForm[key];
        }

        try {
            const partialSchema =
                schema && typeof schema.pick === "function"
                    ? schema
                          .pick(
                              Object.fromEntries(
                                  baseNames.map((k) => [k, true])
                              )
                          )
                          .partial()
                    : schema;
            partialSchema.parse(dataToValidate);
            return true;
        } catch (err) {
            const issues = err.errors ?? err.issues ?? [];
            errors = mapZodErrors(issues);
            return false;
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
            } else {
                await updateItem(type, slug, validData);
                alert("Изменения сохранены");
                resetForm(form, initializeForm(), type, slug);
            }

            goto(redirectTo);
        } catch (err) {
            const issues = err.errors ?? err.issues ?? [];
            errors = mapZodErrors(issues);
            generalError =
                err.message || JSON.stringify(err) || "Ошибка при сохранении";
        } finally {
            isLoading = false;
        }
    }

    async function nextStep() {
        if (!currentStepObj) return;

        const ok = await validateCurrentStep();
        if (!ok) return;

        if (currentStep < totalSteps - 1) {
            currentStep += 1;
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            await handleSubmit();
        }
    }

    function prevStep() {
        if (currentStep > 0) {
            currentStep -= 1;
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            goto(redirectTo);
        }
    }

    async function publishToSocials() {
        const confirmPublish = confirm("Опубликовать пост в Telegram?");
        if (!confirmPublish) return; // если пользователь нажал «Отмена» — выходим

        const res = await fetch("/api/social", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                type,
                slug: $form.slug,
                title: $form.title,
                description: $form.description,
                image: $form.image,
                url: `https://kemer.app/blogs/${$form.slug || slug}`,
                url_ru: `https://kemer.app/ru/blogs/${$form.slug || slug}`,
            }),
        });

        const result = await res.json();
        alert(result.success ? "✅ Опубликовано!" : "❌ Ошибка публикации");
    }
</script>

<div class="wizard">
    <!-- Header -->
    <div class="wizard-header">
        {#if type === "blogs"}
            <MyButton
                onclick={publishToSocials}
                type="button"
                size="xs"
                width="width-sm">🚀 TG</MyButton
            >
        {/if}
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
            class="close-btn">×</button
        >
    </div>

    <!-- Content -->
    <div class="wizard-content">
        {#if currentStepObj}
            <fieldset>
                <legend>{currentStepObj.title}</legend>

                {#each currentStepObj.fields as field}
                    <FormField
                        {field}
                        bind:value={$form[field.name]}
                        errors={errors[field.name] ?? {}}
                        fieldName={field.name}
                    />
                {/each}
            </fieldset>
        {/if}
    </div>

    <!-- Footer -->
    <div class="wizard-footer">
        <MyButton
            width="width-auto"
            variant="outline"
            size="xs"
            onclick={prevStep}
        >
            Назад
        </MyButton>

        <div class="step-counter">Шаг {currentStep + 1} из {totalSteps}</div>

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
    } /* header фиксированный */
    .wizard-header {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        gap: 1rem;
        padding: var(--space-vertical-sm) 0;
        background: var(--color-bg);
        border-bottom: 1px solid var(--color-gray-300);
        position: sticky;
        top: 0;
        z-index: 10;
    } /* контент прокручивается */
    .wizard-content {
        width: 100%;
        flex: 1;
        overflow-y: auto;
        padding: var(--space-vertical-md) 0;
        display: flex;
        flex-direction: column;
        gap: 1rem; /* Важно для скролла */
        min-height: 0;
    } /* footer фиксированный */
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
    } /* Для темной темы */
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
    } /* Адаптивность для мобильных */
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
