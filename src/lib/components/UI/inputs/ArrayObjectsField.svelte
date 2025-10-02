<script>
    import { onMount } from "svelte";
    import PrimitiveField from "./PrimitiveField.svelte";
    import ObjectField from "./ObjectField.svelte";

    export let field; // поле с type="arrayObjects"
    export let value = []; // массив объектов
    export let errors = {};
    export let fieldName = "";

    function addItem() {
        const newItem = {};
        field.fields.forEach((f) => {
            if (f.type === "object") {
                newItem[f.name] = f.default ?? {};
            } else if (f.type === "arrayObjects") {
                newItem[f.name] = f.default ?? [];
            } else {
                newItem[f.name] = f.default ?? null;
            }
        });
        value = [...value, newItem];
    }

    function removeItem(index) {
        value = value.filter((_, i) => i !== index);
    }
</script>

<div class="array-objects-field">
    {#each value as item, index (index)}
        <fieldset class="array-item">
            <legend>{field.label} {index + 1}</legend>

            {#each field.fields as subField}
                {#if subField.type === "object"}
                    <ObjectField
                        field={subField}
                        bind:value={item[subField.name]}
                        errors={errors[index]?.[subField.name] ?? {}}
                        fieldName={`${fieldName}[${index}].${subField.name}`}
                    />
                {:else if subField.type === "arrayObjects"}
                    <ArrayObjectsField
                        field={subField}
                        bind:value={item[subField.name]}
                        errors={errors[index]?.[subField.name] ?? {}}
                        fieldName={`${fieldName}[${index}].${subField.name}`}
                    />
                {:else}
                    <PrimitiveField
                        field={subField}
                        bind:value={item[subField.name]}
                        errors={errors[index]?.[subField.name] ?? {}}
                        fieldName={`${fieldName}[${index}].${subField.name}`}
                    />
                {/if}
            {/each}

            <button
                type="button"
                class="remove-btn"
                on:click={() => removeItem(index)}
            >
                Удалить
            </button>
        </fieldset>
    {/each}

    <button type="button" class="add-btn" on:click={addItem}>
        Добавить элемент
    </button>
</div>

<style>
    .array-objects-field {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }
    .array-item {
        border: 1px dashed var(--color-gray-400);
        padding: 0.5rem;
        position: relative;
    }
    .add-btn,
    .remove-btn {
        background: var(--color-primary);
        color: white;
        border: none;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        border-radius: 4px;
        margin-top: 0.5rem;
    }
    .remove-btn {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        background: var(--color-error);
    }
</style>
