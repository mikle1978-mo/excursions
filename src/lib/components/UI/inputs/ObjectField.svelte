<script>
    import PrimitiveField from "./PrimitiveField.svelte";
    import ArrayField from "./ArrayField.svelte";
    import ObjectField from "./ObjectField.svelte"; // рекурсивно

    export let field; // конфигурация объекта
    export let value; // bind:value сюда придет объект с данными
    export let errors = {};
    export let fieldName = "";

    // Инициализация вложенных объектов
    if (!value) {
        value = {};
    }

    // Для каждого под-поля, если объект/массив, гарантируем дефолт
    field?.fields?.forEach((subField) => {
        if (value[subField.name] === undefined) {
            if (subField.type === "object") value[subField.name] = {};
            else if (subField.type === "array") value[subField.name] = [];
            else value[subField.name] = subField.default ?? "";
        }
    });
</script>

<fieldset>
    {#if field?.label}
        <legend>{field.label}</legend>
    {/if}

    {#each field.fields as subField}
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
