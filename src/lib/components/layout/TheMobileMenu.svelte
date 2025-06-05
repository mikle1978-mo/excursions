<script>
    import { locale } from "$lib/stores/locale.js";
    import { mobileMenuOpen } from "$lib/stores/mobileMenu";
    import { onMount } from "svelte";

    // Мобильная адаптивность
    let isMobile = false;

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth < 768;
            if (!isMobile) mobileMenuOpen.set(false);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    const closeMobileMenu = () => mobileMenuOpen.set(false);
    const handleKeydown = (e) =>
        e.key === "Escape" && $mobileMenuOpen && isMobile && closeMobileMenu();
    const handleBackdropClick = () => closeMobileMenu();
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $mobileMenuOpen && isMobile}
    <div
        class="sidebar-overlay"
        role="presentation"
        on:click={handleBackdropClick}
        on:keydown={(e) => e.key === "Enter" && closeMobileMenu()}
    ></div>
{/if}

<side class="sidebar" class:active={$mobileMenuOpen && isMobile}>
    <div class="sidebar-content">
        <h3 class="sidebar-title">меню</h3>
        <p>Здесь будут дополнительные опции</p>
    </div>

    {#if isMobile}
        <button class="close-button" on:click={closeMobileMenu}>✕</button>
    {/if}
</side>

<style>
    .sidebar {
        display: none;
        height: 100svh;
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        background-color: var(--color-bg);
        border-right: 1px solid var(--color-gray-300);
        overflow: hidden;
        position: sticky;
        top: 0;
        transition: var(--transition-normal);
    }

    .sidebar-content {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
        flex-direction: column;
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

    @media (prefers-color-scheme: dark) {
        .sidebar-overlay {
            background-color: rgba(var(--color-dark-rgb), 0.7);
        }
    }

    @media (max-width: 768px) {
        .sidebar {
            display: block;
            position: fixed;
            top: 0;
            right: -300px;
            width: 280px;
            height: 100svh;
            z-index: 1000;
            transition: transform 0.3s ease;
        }

        .sidebar.active {
            transform: translateX(-300px);
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
        }
    }
</style>
