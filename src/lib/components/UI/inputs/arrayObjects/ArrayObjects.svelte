<script>
    import FormField from "$lib/components/UI/inputs/FormField.svelte";

    export let value;
    export let field;
    export let errors = {};
    export let fieldName = "";
    export let label;
    export let placeholder;

    // Логируем входные данные

    // Если value нет, берем дефолт из шага
    $: if (value === undefined && field.default !== undefined) {
        value = Array.isArray(field.default)
            ? [...field.default]
            : field.default;
        console.log("ArrayObjects set value from default:", value);
    }

    // Если value не массив (для arrayObjects), и ожидается массив — инициализируем
    $: if (field.type === "arrayObjects" && !Array.isArray(value)) {
        value = [];
        console.log("ArrayObjects value was not array, set to empty:", value);
    }

    function addItem() {
        console.log("Before addItem, value:", value);
        if (!Array.isArray(value)) value = [];

        const newItem = {};
        if (field.fields?.length) {
            for (const sub of field.fields) {
                if (sub.localized && sub.default) {
                    newItem[sub.name] = { ...sub.default }; // копируем объект с языками
                } else {
                    newItem[sub.name] = sub.default ?? "";
                }
            }
        }

        value = [...value, newItem];
        console.log("After addItem, value:", value);
    }

    function removeItem(index) {
        console.log("Before removeItem, value:", value);
        value = [...value.slice(0, index), ...value.slice(index + 1)];
        console.log("After removeItem, value:", value);
    }
</script>

<div class="array-object">
    <button type="button" on:click={addItem}>
        Добавить {label ?? "элемент"}
    </button>

    {#each value as item, i}
        <fieldset class="array-object-item">
            <legend>{label} {i + 1}</legend>

            {#each field.fields as subField}
                <FormField
                    field={subField}
                    bind:value={item[subField.name]}
                    errors={errors[i]?.[subField.name] ?? {}}
                    fieldName={`${fieldName}[${i}].${subField.name}`}
                    {placeholder}
                />
            {/each}

            <button type="button" on:click={() => removeItem(i)}>Удалить</button
            >
        </fieldset>
    {/each}
</div>

<style>
    fieldset {
        border: 1px solid var(--color-gray-400);
        padding: 0.5rem;
        margin-bottom: 1rem;
    }

    legend {
        font-weight: bold;
    }

    .array-object button {
        margin-bottom: 0.5rem;
    }
</style>
