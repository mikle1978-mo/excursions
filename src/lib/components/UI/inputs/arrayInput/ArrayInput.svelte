<script>
    export let value = [];
    export let placeholder =
        "Введите элементы (через запятую или с новой строки)";
    // export let delimiter = /[,;\n]+/;
    export let label = "Элементы:";

    let inputValue = "";

    function addItems() {
        // Улучшенный парсинг с учетом всех случаев
        const items = inputValue
            .split("\n") // Сначала делим по строкам
            .flatMap((line) =>
                line
                    .split(/[,;]+/) // Затем по запятым/точкам с запятой
                    .map((item) => item.trim().replace(/^["'`]|["'`]$/g, ""))
            )
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

<div>
    <slot>{label}</slot>
    <div class="array-input">
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
        <textarea bind:value={inputValue} {placeholder} rows="2"></textarea>
        <button on:click={addItems} type="button" class="button">
            Добавить
        </button>
    </div>
</div>

<style>
    textarea {
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
        padding: 1rem 2rem;
        max-width: 20rem;
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
    .array-input {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    .items-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
        padding: var(--space-vertical-md) 0;
    }
    .item {
        background: #f0f0f0;
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
