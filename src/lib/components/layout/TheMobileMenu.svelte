<script>
    import { locale, getLocalizedPath } from "$lib/stores/locale.js";
    import { mobileMenuOpen } from "$lib/stores/mobileMenu";
    import { nav_items } from "$lib/i18n/nav_list";
    import TheSocial from "./TheSocial.svelte";
    import Copyright from "./Copyright.svelte";

    const closeMobileMenu = () => mobileMenuOpen.set(false);
    const handleKeydown = (e) =>
        e.key === "Escape" && $mobileMenuOpen && closeMobileMenu();
    const handleBackdropClick = () => closeMobileMenu();

    const labels = { menu: { ru: "меню", en: "menu" } };

    // Функция для безопасного получения локализованного заголовка
    const getTitle = (item) => {
        if (!item || !item.title) return "";
        return item.title[$locale] || item.title.en || "";
    };

    // Функция для проверки активной ссылки
    const isValidLink = (link) => link && link.trim() !== "";
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $mobileMenuOpen}
    <div
        class="sidebar-overlay"
        role="presentation"
        on:click={handleBackdropClick}
        on:keydown={(e) => e.key === "Enter" && closeMobileMenu()}
    ></div>
{/if}

<aside class="sidebar" class:active={$mobileMenuOpen}>
    <div class="sidebar-content">
        <span class="sidebar-title">{labels.menu[$locale]}</span>
        <nav class="navigation" aria-label="Main navigation">
            {#each nav_items as item}
                {#if isValidLink(item.link)}
                    <a
                        href={getLocalizedPath($locale, item.link)}
                        class="nav-item"
                        on:click={closeMobileMenu}
                        aria-label={getTitle(item)}
                        rel={item.rel || "noopener"}
                    >
                        {getTitle(item)}
                    </a>
                {:else}
                    <span class="nav-item disabled">
                        {getTitle(item)}
                    </span>
                {/if}
            {/each}
        </nav>

        <TheSocial />
        <Copyright />
    </div>

    <button
        class="close-button"
        on:click={closeMobileMenu}
        aria-label="Close menu"
    >
        ✕
    </button>
</aside>

<style>
    .sidebar {
        height: 100svh;
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        background-color: var(--color-bg);
        border-right: 1px solid var(--color-gray-300);
        overflow: hidden;
        position: fixed;
        top: 0;
        right: -300px;
        width: 280px;
        z-index: 1000;
        transition: var(--transition-normal);
    }

    .sidebar.active {
        transform: translateX(-300px);
    }

    .sidebar-content {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
        gap: var(--space-vertical-md);
    }

    .sidebar-title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-primary);
    }

    .sidebar-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(var(--color-dark-rgb), 0.5);
        z-index: 999;
        backdrop-filter: blur(2px);
        transition: opacity 0.3s ease;
        cursor: pointer;
    }

    .close-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        color: var(--color-text);
        cursor: pointer;
        transition: color var(--transition-fast);
        padding: var(--space-vertical-xs);
    }

    .close-button:hover {
        color: var(--color-primary);
    }

    .navigation {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        overflow-y: auto;
    }

    .nav-item {
        display: flex;
        align-items: center;
        padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        text-transform: uppercase;
        text-decoration: none;
        color: var(--color-text);
        font-size: var(--text-sm);
        font-weight: 500;
        letter-spacing: 0.05em;
        border-radius: var(--radius-sm);
        transition: all var(--transition-fast);
        position: relative;
    }

    .nav-item:hover:not(.disabled) {
        background-color: var(--color-gray-200);
        color: var(--color-primary);
    }

    .nav-item.disabled {
        color: var(--color-gray-500);
        cursor: not-allowed;
    }

    .nav-item::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: var(--space-horizontal-sm);
        right: var(--space-horizontal-sm);
        height: 1px;
        background-color: var(--color-gray-300);
    }

    .nav-item:last-child::after {
        display: none;
    }

    @media (prefers-color-scheme: dark) {
        .sidebar-overlay {
            background-color: rgba(var(--color-dark-rgb), 0.7);
        }

        .nav-item:hover:not(.disabled) {
            background-color: var(--color-gray-800);
        }

        .nav-item.disabled {
            color: var(--color-gray-600);
        }
    }
</style>
