<script>
    import PrimitiveField from "./PrimitiveField.svelte";
    import ObjectField from "./ObjectField.svelte";
    import ArrayField from "./ArrayField.svelte"; // рекурсивно (поддержка вложенных массивов)
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    import MyButton from "$lib/components/UI/buttons/MyButton.svelte";

    export let field = {}; // конфиг поля (type="array" или type="arrayObjects")
    export let value = []; // массив примитивов или объектов
    export let errors = {}; // ошибки для всего массива
    export let fieldName = ""; // путь к полю, например "content"

    let inputValue = ""; // для добавления примитивов через textarea

    // безопасный клон
    function cloneDeep(obj) {
        try {
            return structuredClone(obj);
        } catch {
            return JSON.parse(JSON.stringify(obj ?? null));
        }
    }

    // гарантируем, что value — массив (если пришло что-то другое — приводим к [])
    $: if (!Array.isArray(value)) {
        value = [];
    }

    // считаем, что в конфиге массив объектов, если есть поле .fields
    const isObjectArray =
        Array.isArray(field.fields) && field.fields.length > 0;

    function addItem() {
        if (isObjectArray) {
            // создаём новый объект на основе field.fields
            const newItem = {};
            for (const f of field.fields) {
                if (f.type === "object") {
                    // вложенный объект — берем default или пустой объект
                    newItem[f.name] =
                        f.default !== undefined ? cloneDeep(f.default) : {};
                } else if (f.type === "array" || f.type === "arrayObjects") {
                    // вложенный массив — берем default или пустой массив
                    newItem[f.name] =
                        f.default !== undefined ? cloneDeep(f.default) : [];
                } else if (f.type === "checkbox") {
                    newItem[f.name] =
                        f.default !== undefined ? cloneDeep(f.default) : false;
                } else {
                    // примитив
                    newItem[f.name] =
                        f.default !== undefined ? cloneDeep(f.default) : "";
                }
            }
            value = [...value, newItem];
        } else {
            // массив примитивов — парсим textarea построчно
            const items = inputValue
                .split("\n")
                .map((it) => it.trim())
                .filter((it) => it.length > 0);

            if (items.length > 0) {
                const unique = items.filter((it) => !value.includes(it));
                if (unique.length) {
                    value = [...value, ...unique];
                }
                inputValue = "";
            }
        }
    }

    function removeItem(index) {
        value = [...value.slice(0, index), ...value.slice(index + 1)];
    }
</script>

<div class="label">
    <slot>{field.label}:</slot>

    {#if isObjectArray}
        <!-- Массив объектов -->
        <div class="array-objects">
            {#each value as item, index (index)}
                <fieldset class="array-item">
                    <legend>{field.label} {index + 1}</legend>

                    {#each field.fields as subField}
                        {#if subField.type === "object"}
                            <ObjectField
                                field={subField}
                                bind:value={item[subField.name]}
                                errors={errors?.[index]?.[subField.name] ?? {}}
                                fieldName={`${fieldName}[${index}].${subField.name}`}
                            />
                        {:else if subField.type === "array" || subField.type === "arrayObjects"}
                            <!-- рекурсия: массив внутри объекта -->
                            <ArrayField
                                field={subField}
                                bind:value={item[subField.name]}
                                errors={errors?.[index]?.[subField.name] ?? {}}
                                fieldName={`${fieldName}[${index}].${subField.name}`}
                            />
                        {:else}
                            <PrimitiveField
                                field={subField}
                                bind:value={item[subField.name]}
                                errors={errors?.[index]?.[subField.name] ?? {}}
                                fieldName={`${fieldName}[${index}].${subField.name}`}
                            />
                        {/if}
                    {/each}

                    <div class="actions">
                        <button
                            type="button"
                            class="remove-btn"
                            on:click={() => removeItem(index)}
                        >
                            Удалить
                        </button>
                    </div>
                </fieldset>
            {/each}

            <MyButton type="button" onclick={addItem}
                >Добавить {field.label}</MyButton
            >
        </div>
    {:else}
        <!-- Массив примитивов (поведение как было раньше) -->
        <div class="array-input">
            <div
                class={`items-list ${value.length > 0 ? "has-items" : "no-items"}`}
            >
                {#each value as item, index (index)}
                    <div class="item">
                        <span>{item}</span>
                        <div class="actions">
                            <button
                                on:click={() => removeItem(index)}
                                type="button"
                                class="clear-btn"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                {/each}
            </div>

            <div class="input-group">
                <textarea
                    bind:value={inputValue}
                    placeholder={field.placeholder ??
                        "Введите элементы (каждый с новой строки)"}
                ></textarea>
                <MyButton
                    width="width-auto"
                    size="xs"
                    onclick={addItem}
                    type="button">Добавить</MyButton
                >
            </div>
        </div>
    {/if}

    <ErrorMessage field={fieldName} {errors} />
</div>

<style>
    .array-objects {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .array-item {
        border: 1px solid var(--color-gray-400);
        padding: 0.6rem;
        border-radius: var(--radius-sm);
    }

    .array-input {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .input-group {
        display: flex;
        gap: 0.5rem;
        align-items: flex-start;
    }

    textarea {
        width: 100%;
        padding: 0.5rem;
        border-radius: var(--radius-sm);
        border: 1px solid var(--color-gray-400);
        resize: vertical;
    }

    .items-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        padding: var(--space-vertical-md) var(--space-vertical-sm);
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-gray-200);
    }

    .items-list.has-items {
        border-color: var(--color-success, green);
    }

    .item {
        background: var(--color-bg);
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .clear-btn,
    .remove-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.1rem;
        color: var(--color-error);
    }

    .actions {
        display: flex;
        align-items: center;
    }
</style>
