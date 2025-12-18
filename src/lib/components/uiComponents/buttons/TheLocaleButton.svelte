<script>
    import { locale, setLocale } from "$lib/stores/locale.js";
    import { get } from "svelte/store";
    import { page } from "$app/stores";
    import { fly } from "svelte/transition";
    import {
        SUPPORTED_LANGUAGES,
        LANG_META,
    } from "$lib/constants/supportedLanguages";

    let isOpen = false;

    const changeLanguage = (lang) => {
        const currentLocale = get(locale);
        if (lang === currentLocale) {
            isOpen = false;
            return;
        }

        const currentPath = get(page).url.pathname;
        let segments = currentPath.split("/").filter(Boolean);

        // Не трогаем admin и api
        if (segments[0] === "admin" || segments[0] === "api") {
            setLocale(lang);
            isOpen = false;
            return;
        }

        // если первый сегмент — язык, заменяем
        if (SUPPORTED_LANGUAGES.includes(segments[0])) {
            segments[0] = lang;
        } else {
            segments.unshift(lang);
        }

        const newPath = "/" + segments.join("/");

        setLocale(lang);
        // ❗ НЕ goto — он делает SPA
        window.location.assign(newPath);

        isOpen = false;
    };

    const toggleDropdown = () => (isOpen = !isOpen);
</script>

<div class="locale-container">
    <button
        class="locale-button {isOpen ? 'open' : ''}"
        onclick={toggleDropdown}
        aria-expanded={isOpen}
    >
        <span>{$locale.toUpperCase()}</span>
    </button>

    {#if isOpen}
        <div class="locale-dropdown" transition:fly={{ y: 10, duration: 200 }}>
            {#each SUPPORTED_LANGUAGES as lang}
                <button
                    class="locale-option {$locale === lang ? 'selected' : ''}"
                    onclick={() => changeLanguage(lang)}
                >
                    <span>{LANG_META[lang].flag} </span>
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
