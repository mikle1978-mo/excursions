<script>
    import PrimitiveField from "./PrimitiveField.svelte";
    import ArrayField from "./ArrayField.svelte";
    import ObjectField from "./ObjectField.svelte"; // рекурсивно
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";

    export let field; // { label, fields: [...] }
    export let value = {}; // bind:value — объект данных
    export let errors = {}; // ошибки по объекту
    export let fieldName = "";
</script>

<fieldset>
    {#if field?.label}
        <legend>{field.label}</legend>
    {/if}

    {#each field.fields ?? [] as subField}
        {#if subField.type === "object"}
            <ObjectField
                field={subField}
                bind:value={value[subField.name]}
                errors={errors?.[subField.name] ?? {}}
                fieldName={`${fieldName}.${subField.name}`}
            />
        {:else if subField.type === "array"}
            <ArrayField
                field={subField}
                bind:value={value[subField.name]}
                errors={errors?.[subField.name] ?? {}}
                fieldName={`${fieldName}.${subField.name}`}
            />
        {:else}
            <PrimitiveField
                field={subField}
                bind:value={value[subField.name]}
                errors={errors?.[subField.name] ?? {}}
                fieldName={`${fieldName}.${subField.name}`}
            />
        {/if}
    {/each}

    <ErrorMessage field={fieldName} {errors} />
</fieldset>

<style>
    fieldset {
        border: 1px solid var(--color-gray-400);
        padding: 0.6rem;
        margin-bottom: 1rem;
        border-radius: var(--radius-sm);
    }
    legend {
        font-weight: 600;
        padding: 0 0.5rem;
    }
</style>
