<script>
    import { createEventDispatcher, onMount } from "svelte";

    const dispatch = createEventDispatcher();

    // Закрываем модалку (вызываем событие "close")
    function close() {
        dispatch("close");
    }

    // Обработка Escape для закрытия
    function handleKeydown(event) {
        if (event.key === "Escape") {
            close();
        }
    }

    let modalContent;

    // При монтировании фокусируем модалку
    onMount(() => {
        modalContent?.focus();
    });
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Фон модалки без клика, только визуальный -->
<div class="modal-backdrop" aria-hidden="true"></div>

<!-- Контент модалки с ролью dialog, фокусируем -->
<div
    class="modal-content"
    role="dialog"
    aria-modal="true"
    aria-label="Модальное окно"
    tabindex="0"
    bind:this={modalContent}
>
    <slot />

    <button
        type="button"
        class="modal-close"
        aria-label="Закрыть модальное окно"
        on:click={close}
    >
        ×
    </button>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .modal-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: transparent;
        padding: var(--space-vertical-sm);
        border-radius: var(--radius-md);
        z-index: 1001;
        outline: none;
        max-width: 95vw;
        max-height: 80vh;
        overflow-y: auto;
    }

    .modal-close {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: transparent;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
    }
</style>
