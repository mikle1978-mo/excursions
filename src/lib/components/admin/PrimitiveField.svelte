<script>
    import TextInput from "$lib/components/UI/inputs/textInput/TextInput.svelte";
    import TexrAreaInput from "$lib/components/UI/inputs/textareaInput/TexrAreaInput.svelte";
    import NumberInput from "$lib/components/UI/inputs/numberInput/NumberInput.svelte";
    import CheckBoxInput from "$lib/components/UI/inputs/checkboxInput/CheckBoxInput.svelte";
    import SelectInput from "$lib/components/UI/inputs/selectInput/SelectInput.svelte";
    import ArrayInput from "$lib/components/UI/inputs/arrayInput/ArrayInput.svelte";
    import ImageUploader from "$lib/components/UI/inputs/ImageUploader/ImageUploader.svelte";
    import DateInput from "$lib/components/UI/inputs/dateInput/DateInput.svelte";

    export let field;
    export let value;
    export let errors = {};
    export let fieldName = "";

    // Если значение не передано — берем дефолт
    $: if (value === undefined && field.default !== undefined) {
        value = field.default;
    }
</script>

{#if field.type === "text"}
    <TextInput bind:value label={field.label} field={fieldName} {errors} />
{:else if field.type === "textarea"}
    <TexrAreaInput bind:value label={field.label} field={fieldName} {errors} />
{:else if field.type === "number"}
    <NumberInput bind:value label={field.label} field={fieldName} {errors} />
{:else if field.type === "checkbox"}
    <CheckBoxInput bind:value label={field.label} field={fieldName} {errors} />
{:else if field.type === "select"}
    <SelectInput
        bind:value
        label={field.label}
        options={field.options}
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
    <!-- Фоллбек — текстовое поле -->
    <TextInput bind:value label={field.label} field={fieldName} {errors} />
{/if}
