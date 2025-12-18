<script>
    import { searchQuery } from "$lib/stores/searchQuery.js";
    import { locale } from "$lib/stores/locale";
    import { onMount, tick } from "svelte";

    const labels = {
        placeholder: { en: "Search...", ru: "Поиск..." },
        clear: { en: "Clear search", ru: "Очистить поиск" },
        submit: { en: "Perform search", ru: "Выполнить поиск" },
    };

    let query = "";
    let isMounted = false;
    let isFocused = false;
    let expanded = false;
    let inputEl;

    function handleInput() {
        searchQuery.set(query.trim());
    }

    function clearInput() {
        query = "";
        searchQuery.set("");
        inputEl?.focus();
    }

    async function toggleSearch() {
        expanded = !expanded;
        if (expanded) {
            await tick();
            inputEl?.focus();
        } else {
            clearInput();
        }
    }

    onMount(() => {
        isMounted = true;
        locale.subscribe((v) => ($locale = v));
    });
</script>

{#if isMounted}
    <form
        role="search"
        on:submit|preventDefault={handleInput}
        class="search-form"
    >
        <div class="search-container {expanded ? 'expanded' : ''}">
            <button
                type="button"
                class="search-button"
                aria-label={labels.submit[$locale] || labels.submit.en}
                on:click={toggleSearch}
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
                bind:this={inputEl}
                type="text"
                bind:value={query}
                on:focus={() => (isFocused = true)}
                on:blur={() => (isFocused = false)}
                on:input={handleInput}
                placeholder={labels.placeholder[$locale] ||
                    labels.placeholder.en}
                aria-label={labels.placeholder[$locale] ||
                    labels.placeholder.en}
            />

            <button
                type="button"
                class="clear-btn {query ? 'visible' : ''}"
                on:click={clearInput}
                aria-label={labels.clear[$locale] || labels.clear.en}
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
{/if}

<style>
    .search-form {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }

    .search-container {
        display: flex;
        align-items: center;
        background: var(--color-bg);
        border-radius: 50%;
        overflow: hidden;
        width: 32px;
        height: 32px;
        transition: all 0.3s ease;
        border: 2px solid var(--color-gray-500);
    }

    .search-container.expanded {
        width: 100%;
        border-radius: var(--radius-full);
        border-color: var(--color-primary);
    }

    .search-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--color-gray-500);
    }

    input {
        width: 0;
        border: none;
        outline: none;
        background: transparent;
        flex: 1;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .search-container.expanded input {
        width: 100%;
        opacity: 1;
    }

    .clear-btn {
        width: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease;
    }

    .clear-btn.visible {
        width: 24px;
        opacity: 1;
        pointer-events: auto;
    }
</style>
