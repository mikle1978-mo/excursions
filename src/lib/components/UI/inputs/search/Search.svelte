<script>
    let query = "";
    let isFocused = false;

    function clearInput() {
        query = "";
    }

    function handleSearch() {
        if (query.trim()) {
            console.log("Searching for:", query);
        }
    }
</script>

<form role="search" on:submit|preventDefault={handleSearch} class="search-form">
    <div class="search-container {isFocused ? 'focused' : ''}">
        <button
            type="submit"
            class="search-button"
            aria-label="Выполнить поиск"
        >
            <svg
                class="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
            >
                <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
                <path
                    d="M21 21L16.65 16.65"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        </button>

        <input
            type="text"
            bind:value={query}
            on:focus={() => (isFocused = true)}
            on:blur={() => (isFocused = false)}
            placeholder="Поиск..."
            aria-label="Поиск"
            required
        />

        <button
            type="button"
            class="clear-btn {query ? 'visible' : ''}"
            on:click={clearInput}
            aria-label="Очистить поиск"
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                />
                <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                />
            </svg>
        </button>
    </div>
</form>

<style>
    .search-form {
        width: 100%;
        height: 100%;
    }
    .search-container {
        position: relative;
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        width: 100%;
        height: 100%;
        max-width: var(--max-width-text);
        background: var(--color-gray-100);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-full);
        padding: 0 var(--space-horizontal-xs);
        gap: var(--space-horizontal-xs);
        box-shadow: var(--shadow-sm);
        transition: all var(--transition-normal);
    }

    .search-container.focused {
        background: var(--color-bg);
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
        animation: input-focus var(--transition-slow);
    }

    .search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: var(--color-gray-500);
        transition: color var(--transition-fast);
    }

    .search-container.focused .search-button {
        color: var(--color-primary);
    }

    input {
        width: 100%;
        border: none;
        background: transparent;
        color: var(--color-text);
        font-size: var(--text-md);
        font-family: inherit;
        line-height: var(--line-height-base);
        outline: none;
    }

    input::placeholder {
        color: var(--color-gray-500);
        font-size: var(--text-sm);
        transition: opacity var(--transition-fast);
    }

    input:focus::placeholder {
        opacity: 0.5;
    }

    .clear-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        padding: 0;
        border-radius: var(--radius-full);
        color: var(--color-gray-500);
        cursor: pointer;
        transition: all var(--transition-fast);
        /* Скрыта по умолчанию */
        opacity: 0;
        pointer-events: none;
    }

    .clear-btn.visible {
        opacity: 1;
        pointer-events: auto;
    }

    .clear-btn:hover,
    .clear-btn:focus {
        color: var(--color-error);
        background: var(--color-gray-200);
    }

    @keyframes input-focus {
        0% {
            box-shadow: var(--shadow-sm);
        }
        50% {
            box-shadow: 0 0 0 var(--space-horizontal-xs) rgba(74, 201, 126, 0.2);
        }
        100% {
            box-shadow: var(--shadow-md);
        }
    }

    @media (prefers-color-scheme: dark) {
        .search-container {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }

        .search-container.focused {
            background: var(--color-gray-900);
        }

        .clear-btn:hover,
        .clear-btn:focus {
            background: var(--color-gray-700);
        }
    }

    @media (max-width: 768px) {
        input::placeholder {
            font-size: var(--text-xs);
        }
    }
</style>
