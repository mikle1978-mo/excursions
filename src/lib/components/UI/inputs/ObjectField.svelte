<script>
    import PrimitiveField from "./PrimitiveField.svelte";
    import ArrayObjectsField from "./ArrayObjectsField.svelte";
    import ObjectField from "./ObjectField.svelte"; // рекурсивно

    export let field; // объектное поле из конфигурации (type="object")
    export let value; // значение объекта
    export let errors = {};
    export let fieldName = ""; // путь к полю, например "car.features"

    // если value нет, берем дефолт
    $: if (value === undefined && field.default !== undefined) {
        value = field.default;
    }
</script>

<fieldset>
    {#if field.label}
        <legend>{field.label}</legend>
    {/if}

    {#each field.fields as subField}
        {#if subField.type === "object"}
            <ObjectField
                field={subField}
                bind:value={value[subField.name]}
                errors={errors[subField.name] ?? {}}
                fieldName={`${fieldName}.${subField.name}`}
            />
        {:else if subField.type === "arrayObjects"}
            <ArrayObjectsField
                field={subField}
                bind:value={value[subField.name]}
                errors={errors[subField.name] ?? {}}
                fieldName={`${fieldName}.${subField.name}`}
            />
        {:else}
            <PrimitiveField
                field={subField}
                bind:value={value[subField.name]}
                errors={errors[subField.name] ?? {}}
                fieldName={`${fieldName}.${subField.name}`}
            />
        {/if}
    {/each}
</fieldset>

<style>
    fieldset {
        border: 1px solid var(--color-gray-400);
        padding: 0.5rem;
        margin-bottom: 1rem;
    }
    legend {
        font-weight: bold;
        padding: 0 0.5rem;
    }
</style>
