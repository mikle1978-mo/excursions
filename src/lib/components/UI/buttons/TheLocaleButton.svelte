<script>
    import { locale, setLocale } from "$lib/stores/locale.js";
    import { goto } from "$app/navigation";
    import { fly } from "svelte/transition";
    import { get } from "svelte/store";
    import { page } from "$app/stores";

    const languages = [
        { value: "ru", label: "RU" },
        { value: "en", label: "EN" },
    ];

    let currentLang = get(locale);
    let isOpen = false;

    locale.subscribe((val) => {
        currentLang = val;
    });

    const changeLanguage = (lang) => {
        const currentPath = get(page).url.pathname;
        const segments = currentPath.split("/").filter(Boolean);
        if (segments.length && (segments[0] === "ru" || segments[0] === "en")) {
            segments[0] = lang;
        } else {
            segments.unshift(lang);
        }
        const newPath = "/" + segments.join("/");
        setLocale(lang);
        goto(newPath, { replaceState: true });
        isOpen = false;
    };

    const toggleDropdown = () => {
        isOpen = !isOpen;
    };
</script>

<div class="locale-container">
    <button
        class="locale-button {isOpen ? 'open' : ''}"
        onclick={toggleDropdown}
        aria-label="Выбрать язык"
        aria-expanded={isOpen}
    >
        {#each languages.filter((l) => l.value === currentLang) as l}
            <span>{l.label}</span>
        {/each}
    </button>

    {#if isOpen}
        <div class="locale-dropdown" transition:fly={{ y: 10, duration: 200 }}>
            {#each languages as lang}
                <button
                    class="locale-option {currentLang === lang.value
                        ? 'selected'
                        : ''}"
                    onclick={() => changeLanguage(lang.value)}
                >
                    <span>{lang.label}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .locale-container {
        position: relative;
        height: 100%;
        min-width: 32px;
    }

    .locale-button {
        appearance: none;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        aspect-ratio: 1;
        color: var(--color-text);
        background: var(--color-gray-100);
        border: 1px solid var(--color-gray-300);
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
        background: var(--color-gray-100);
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
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }

        .locale-button:hover,
        .locale-button.open {
            background: var(--color-gray-900);
        }

        .locale-dropdown {
            background: var(--color-gray-900);
            border-color: var(--color-gray-600);
        }

        .locale-option {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
