<script>
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    import MyButton from "$lib/components/UI/buttons/MyButton.svelte";
    export let value = [];
    export let placeholder = "Введите элементы (каждый с новой строки)";
    // export let delimiter = /[,;\n]+/;
    // export let label = "Элементы:";
    export let field = "";
    export let fieldName = "";
    console.log("ArrayField value:", value);
    console.log("ArrayField fieldName:", fieldName);
    console.log("ArrayField field:", field);

    export let errors = {};

    let inputValue = "";

    function addItems() {
        // Улучшенный парсинг с учетом всех случаев
        const items = inputValue
            .split("\n")
            .map((item) => item.trim())
            .filter((item) => item.length > 0);

        if (items.length > 0) {
            // Добавляем только новые уникальные элементы
            const uniqueItems = items.filter((item) => !value.includes(item));
            value = [...value, ...uniqueItems];
            inputValue = "";
        }
    }

    function removeItem(index) {
        // Создаем новый массив через spread для гарантированного обновления
        value = [...value.slice(0, index), ...value.slice(index + 1)];
    }
</script>

<div class="label">
    <slot>{field.label}:</slot>
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
            <textarea bind:value={inputValue} {placeholder}></textarea>
            <MyButton
                width="width-auto"
                size="xs"
                onclick={addItems}
                type="button">Добавить</MyButton
            >
        </div>
    </div>
</div>
<ErrorMessage field={fieldName} {errors} />

<style>
    .label {
        display: flex;
        flex-direction: column;

        gap: 0.3rem;
    }
    .array-input {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .input-group {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
    }
    textarea {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-light);
        color: var(--color-text);
        transition:
            border var(--transition-fast),
            box-shadow var(--transition-fast);
    }

    textarea:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(74, 201, 126, 0.3);
    }
    .button {
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        max-width: 20rem;
        max-height: calc(var(--text-md) * 2);
        border: none;
        border-radius: 3rem;
        cursor: pointer;
        transition: 0.3s;
        background-color: var(--color-primary);
        margin: 0 auto;
        color: inherit;
        text-decoration: none;
        color: var(--color-text);
    }

    .button:hover {
        background-color: var(--primary-light);
    }

    .button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
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

    .items-list.no-items {
        border-color: var(--color-warning, red);
    }

    .item {
        background: var(--color-bg);
        padding: 0.3rem 0.6rem;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .clear-btn {
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

    .clear-btn:hover,
    .clear-btn:focus {
        color: var(--color-error);
        background: var(--color-gray-200);
    }
    .actions {
        display: flex;
        align-items: center;
    }
    @media (prefers-color-scheme: dark) {
        textarea {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
