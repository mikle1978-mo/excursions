<script>
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import CheckBoxInput from "$lib/components/UI/inputs/checkboxInput/CheckBoxInput.svelte";
    import TextInput from "$lib/components/UI/inputs/textInput/TextInput.svelte";
    import TexrAreaInput from "$lib/components/UI/inputs/textareaInput/TexrAreaInput.svelte";
    import NumberInput from "$lib/components/UI/inputs/numberInput/NumberInput.svelte";
    import SelectInput from "$lib/components/UI/inputs/selectInput/SelectInput.svelte";
    import ArrayInput from "$lib/components/UI/inputs/arrayInput/ArrayInput.svelte";
    import ImageUploader from "$lib/components/UI/inputs/ImageUploader/ImageUploader.svelte";
    import DateInput from "$lib/components/UI/inputs/dateInput/DateInput.svelte";

    // Рекурсивный импорт самого себя
    import FormField from "./FormField.svelte";

    export let field;
    export let value;
    export let errors = {};
    export let fieldName = ""; // путь к полю, например "car.model"
</script>

<!-- Локализованное поле -->
{#if field.localized}
    {#each Object.keys(value ?? Object.fromEntries(SUPPORTED_LANGUAGES.map( (l) => [l, {}] ))) as lang}
        <div class="localized-block">
            {#if field.type === "group"}
                <fieldset>
                    <legend>{field.label} ({lang.toUpperCase()})</legend>
                    {#each field.fields as subField}
                        <FormField
                            field={subField}
                            bind:value={value[lang][subField.name]}
                            errors={errors[lang]?.[subField.name] ?? {}}
                            fieldName={`${fieldName}.${lang}.${subField.name}`}
                        />
                    {/each}
                </fieldset>
            {:else}
                <FormField
                    field={{ ...field, localized: false }}
                    bind:value={value[lang]}
                    errors={errors[lang] ?? {}}
                    fieldName={`${fieldName}.${lang}`}
                />
            {/if}
        </div>
    {/each}
{/if}

<!-- Группа не локализованная -->
{#if !field.localized && field.type === "group"}
    <fieldset>
        <legend>{field.label}</legend>
        {#each field.fields as subField}
            <FormField
                field={subField}
                bind:value={value[subField.name]}
                errors={errors[subField.name] ?? {}}
                fieldName={`${fieldName}.${subField.name}`}
            />
        {/each}
    </fieldset>
{/if}

<!-- Все остальные типы не локализованные -->
{#if !field.localized && field.type !== "group"}
    {#if field.type === "text"}
        <TextInput bind:value label={field.label} field={fieldName} {errors} />
    {:else if field.type === "number"}
        <NumberInput
            bind:value
            label={field.label}
            field={fieldName}
            {errors}
        />
    {:else if field.type === "checkbox"}
        <CheckBoxInput
            bind:value
            label={field.label}
            field={fieldName}
            {errors}
        />
    {:else if field.type === "textarea"}
        <TexrAreaInput
            bind:value
            label={field.label}
            field={fieldName}
            {errors}
        />
    {:else if field.type === "select"}
        <SelectInput
            bind:value
            options={field.options}
            label={field.label}
            field={fieldName}
            {errors}
        />
    {:else if field.type === "array"}
        <ArrayInput
            bind:value
            label={field.label}
            placeholder={field.placeholder}
            field={fieldName}
            {errors}
        />
    {:else if field.type === "imageUploader"}
        <ImageUploader
            bind:images={value}
            label={field.label}
            folder={field.folder}
        />
    {:else if field.type === "date"}
        <DateInput bind:value label={field.label} field={fieldName} {errors} />
    {:else}
        <TextInput bind:value label={field.label} field={fieldName} {errors} />
    {/if}
{/if}

<style>
    .localized-block {
        margin-bottom: 1rem;
        padding-left: 0.5rem;
        border-left: 2px dashed var(--color-gray-400);
    }

    fieldset {
        border: 1px solid var(--color-gray-400);
        padding: 0.5rem;
        margin-bottom: 1rem;
    }

    legend {
        font-weight: bold;
    }
</style>
