<script>
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();
    let modalContent;

    function close() {
        dispatch("close");
    }

    function handleKeydown(event) {
        if (event.key === "Escape") {
            close();
        }
    }

    function handleBackdropClick(e) {
        if (e.target === e.currentTarget) {
            close();
        }
    }

    onMount(() => {
        modalContent?.focus();
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    });
</script>

<svelte:window on:keydown={handleKeydown} />

<div
    class="modal-backdrop"
    role="presentation"
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === "Enter" && close()}
>
    <!-- Кнопка закрытия теперь вне контента модалки -->
    <button
        type="button"
        class="modal-close"
        aria-label="Закрыть модальное окно"
        on:click={close}
    >
        ×
    </button>

    <!-- Контент модалки -->
    <div
        class="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabindex="-1"
        bind:this={modalContent}
    >
        <h2 id="modal-title" class="visually-hidden">Модальное окно</h2>
        <slot />
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        display: grid;
        place-items: center;
        background-color: rgba(var(--color-light-rgb), 0.9);
        z-index: 1000;
        cursor: pointer;
    }

    .modal-content {
        width: auto;
        position: relative;
        background: var(--color-bg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        outline: none;
        max-width: min(95vw, 1000px);
        max-height: 80vh;
        overflow-y: auto;
        cursor: auto;
        margin: var(--space-vertical-md);
    }

    .modal-close {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        background: transparent;
        border: none;
        color: var(--color-text);
        font-size: 1.8rem;
        line-height: 1;
        cursor: pointer;
        z-index: 1002; /* Выше чем контент модалки */
        transition: color 0.2s ease;
    }

    .modal-close:hover {
        color: var(--color-primary);
    }

    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    @media (prefers-color-scheme: dark) {
        .modal-backdrop {
            background-color: rgba(var(--color-dark-rgb), 0.9);
        }
    }
</style>
