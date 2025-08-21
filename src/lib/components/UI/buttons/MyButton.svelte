<script>
    export let variant = "primary"; // 'primary' | 'secondary' | 'outline'
    export let size = "md"; // 'sm' | 'md' | 'lg'
    export let width = "width-full"; // 'full' | 'auto' | 'lg'
</script>

<button class="custom-button {variant} {size} {width}" {...$$restProps}>
    <slot />
</button>

<style>
    .custom-button {
        max-height: calc(var(--space-vertical-lg) * 2);
        font-family: inherit;
        font-weight: 500;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: var(--transition-fast);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        border: none;
        line-height: calc(var(--line-height-base) * 1.5);
        position: relative;
        overflow: hidden;
    }

    .width-full {
        width: 100%;
    }
    .width-auto {
        width: auto;
    }

    /* Размеры */
    .xs {
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        font-size: var(--text-xs);
    }
    .sm {
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        font-size: var(--text-sm);
    }
    .md {
        padding: var(--space-vertical-xs) var(--space-horizontal-md);
        font-size: var(--text-md);
    }
    .lg {
        padding: var(--space-vertical-sm) var(--space-horizontal-lg);
        font-size: var(--text-lg);
    }

    /* Варианты стилей */
    .primary {
        background-color: var(--color-primary);
        color: var(--color-light);
    }
    .primary:hover:not(:disabled) {
        background-color: var(--color-primary-hover);
    }

    .secondary {
        background-color: var(--color-secondary);
        color: var(--color-light);
    }
    .secondary:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--color-secondary), black 15%);
    }

    .accent {
        background-color: var(--color-accent);
        color: var(--color-light);
    }
    .accent:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--color-accent), black 15%);
    }

    .outline {
        background-color: transparent;
        color: var(--color-primary);
        border: 1px solid var(--color-primary);
    }

    /* Добавить отдельные правила паддинга для размеров и outline */
    .outline.sm {
        padding: calc(var(--space-vertical-xxs) - 1px)
            calc(var(--space-horizontal-sm) - 1px);
    }
    .outline.md {
        padding: calc(var(--space-vertical-xs) - 1px)
            calc(var(--space-horizontal-md) - 1px);
    }
    .outline.lg {
        padding: calc(var(--space-vertical-sm) - 1px)
            calc(var(--space-horizontal-lg) - 1px);
    }
    .outline:hover:not(:disabled) {
        background-color: color-mix(in srgb, var(--color-primary), white 90%);
    }

    /* Состояния */
    .disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .custom-button:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }

    /* Темная тема */
    @media (prefers-color-scheme: dark) {
        .outline {
            color: var(--color-primary);
            border-color: var(--color-primary);
        }
        .outline:hover:not(:disabled) {
            background-color: color-mix(
                in srgb,
                var(--color-primary),
                black 90%
            );
        }
    }
    .primary::before,
    .secondary::before,
    .accent::before {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 150%;
        height: 150%;
        background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
        );
        transform: rotate(45deg);
        animation: shine 5s infinite;
    }

    @keyframes shine {
        0% {
            transform: translateX(-100%) rotate(-45deg);
        }
        100% {
            transform: translateX(100%) rotate(-45deg);
        }
    }
</style>
