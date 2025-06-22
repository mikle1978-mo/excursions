<script>
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    export let value = [];
    export let placeholder = "Введите элементы (каждый с новой строки)";
    // export let delimiter = /[,;\n]+/;
    export let label = "Элементы:";
    export let field = "";
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
    <slot>{label}</slot>
    <div class="array-input">
        <div class="input-group">
            <textarea bind:value={inputValue} {placeholder}></textarea>
            <button on:click={addItems} type="button" class="button">
                Добавить
            </button>
        </div>
        <div class="items-list">
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
    </div>
</div>
<ErrorMessage {field} {errors} />

<style>
    .label {
        display: flex;
        flex-direction: column;
        font-size: var(--text-sm);
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
        gap: 0.5rem;
    }
    textarea {
        width: 100%;
        padding: 0.5rem 0.75rem;
        font-size: var(--text-md);
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-light);
        color: var(--color-text);
        transition:
            border var(--transition-fast),
            box-shadow var(--transition-fast);
    }

    textarea:focus {
        font-size: 16px;
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(74, 201, 126, 0.3);
    }
    .button {
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        max-width: 20rem;
        max-height: calc(var(--text-md) * 2);
        font-size: inherit;
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
</style>
