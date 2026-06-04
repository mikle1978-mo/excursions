<script>
    import { fly } from "svelte/transition";
    import { mobileMenuOpen } from "$lib/stores/mobileMenu";
    import {
        SUPPORTED_LANGUAGES,
        LANG_META,
    } from "$lib/constants/supportedLanguages";
    import { setLocaleInPath } from "$lib/i18n/locale";

    export let lang;

    let isOpen = false;

    const changeLanguage = async (newLang) => {
        if (newLang === lang) {
            isOpen = false;
            return;
        }

        isOpen = false;

        const newPath = setLocaleInPath(window.location.pathname, newLang);

        document.cookie = `lang=${newLang}; path=/; max-age=31536000`;

        mobileMenuOpen.set(false);

        window.location.href = newPath;
    };

    const toggleDropdown = () => (isOpen = !isOpen);
</script>

<div class="locale-container">
    <button
        class="locale-button {isOpen ? 'open' : ''}"
        onclick={toggleDropdown}
        aria-expanded={isOpen}
    >
        <span>{lang.toUpperCase()}</span>
    </button>

    {#if isOpen}
        <div class="locale-dropdown" transition:fly={{ y: 10, duration: 200 }}>
            {#each SUPPORTED_LANGUAGES as itemLang}
                <button
                    class="locale-option {lang === itemLang ? 'selected' : ''}"
                    onclick={() => changeLanguage(itemLang)}
                >
                    <span>{LANG_META[itemLang].flag} </span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .locale-container {
        position: relative;
        height: 100%;
        width: 32px;
        height: 32px;
    }

    .locale-button {
        appearance: none;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        aspect-ratio: 1;
        color: var(--color-gray-500);
        background: var(--color-bg);
        border: 2px solid var(--color-gray-500);
        border-radius: var(--radius-full);
        padding: 0;
        box-shadow: var(--shadow-sm);
        transition: all var(--transition-normal);
        cursor: pointer;
    }

    .locale-button span {
        font-size: 0.8rem;
    }

    .locale-button:hover,
    .locale-button.open {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
        background: var(--color-bg);
    }

    .locale-dropdown {
        position: absolute;
        top: calc(100% + var(--space-vertical-xs));
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xxs);
        padding: var(--space-vertical-xxs) var(--space-horizontal-xxs);
        background: var(--color-bg);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-md);
        z-index: 10;
    }

    .locale-option {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5vh;
        height: 5vh;
        font-size: var(--text-sm);
        color: var(--color-text);
        background: var(--color-bg);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-full);
        cursor: pointer;
        transition: all var(--transition-fast);
    }

    .locale-option span {
        font-size: 0.8rem;
    }

    .locale-option:hover,
    .locale-option.selected {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }

    @media (prefers-color-scheme: dark) {
        .locale-button {
            border-color: var(--color-gray-600);
        }

        .locale-button:hover,
        .locale-button.open {
            background: var(--color-gray-900);
        }

        .locale-dropdown {
            border-color: var(--color-gray-600);
        }

        .locale-option {
            border-color: var(--color-gray-600);
        }
    }
</style>
