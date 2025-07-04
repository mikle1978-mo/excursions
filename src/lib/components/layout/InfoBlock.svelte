<script>
    import SortControls from "$lib/components/filters/SortControls.svelte";
    import { locale } from "$lib/stores/locale.js";
    import { hasFilter } from "$lib/stores/filters.js";

    export let filteredCount = 0;
    export let infoVisible = false;
    export let onReset;
    export let type;
</script>

<div class="info-block" class:hidden={infoVisible}>
    <div class="filter-container">
        {#if $hasFilter}
            <button
                class="filters-info-button"
                on:click={onReset}
                aria-label="Сбросить фильтры"
                title="Сбросить фильтры"
            >
                {#if $locale === "ru"}
                    Фильтр {filteredCount} элементов
                {:else if $locale === "tr"}
                    {filteredCount} sonuç bulundu
                {:else}
                    Filtered {filteredCount} items
                {/if}
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path
                        d="M18 6 L6 18 M6 6 L18 18"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                    />
                </svg>
            </button>
        {/if}
    </div>
    <SortControls {type} />
</div>

<style>
    .info-block {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-vertical-md);
        background-color: var(--color-bg);
        width: 100%;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        bottom: -1px;
        z-index: 1;
        opacity: 0.9;
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }

    .hidden {
        opacity: 0; /* или 0 */
        transform: translateY(100%);
        pointer-events: none;
        transition:
            opacity 0.3s ease,
            transform 0.3s ease;
    }

    .filters-info-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.8rem;
        background-color: var(--color-bg, #f0f0f0);
        border: 1px solid var(--color-gray-400, #ccc);
        border-radius: var(--radius-md, 6px);
        color: var(--color-text, #333);
        font-size: var(--text-xs, 0.875rem);
        white-space: nowrap;

        cursor: pointer;
        user-select: none;
        transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
    }

    .filters-info-button:hover,
    .filters-info-button:focus {
        background-color: var(--color-primary, #4ac97e);
        border-color: var(--color-primary-hover, #3db16d);
        color: white;
        outline: none;
    }

    .filters-info-button svg {
        width: 1rem;
        height: 1rem;
        fill: currentColor;
        flex-shrink: 0;
    }
</style>
