<script>
    import { cardBlocks } from "$lib/components/blocks/card/cardBlocks.js";
    export let data;
</script>

<div class="card">
    <div class="card__header">
        {#each data.sections.filter((s) => s.position === "header") as section}
            <svelte:component
                this={cardBlocks[section.component]}
                data={section.data}
            />
        {/each}
    </div>

    <div class="card__content">
        {#each data.sections.filter((s) => !s.position || s.position === "content") as section}
            <svelte:component
                this={cardBlocks[section.component]}
                data={section.data}
            />
        {/each}
    </div>

    <div class="card__footer">
        {#each data.sections.filter((s) => s.position === "footer") as section}
            <svelte:component
                this={cardBlocks[section.component]}
                data={section.data}
            />
        {/each}
    </div>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: var(--radius-sm);
        overflow: hidden;
        transition: var(--transition-normal);
        height: 100%;
        min-height: 245px;
        gap: var(--space-vertical-xxs);
        padding-bottom: var(--space-vertical-xxs);
    }

    .card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .card__content {
        display: flex;
        flex-direction: column;
        padding: 0 var(--space-horizontal-sm);
        gap: 0;
        flex-grow: 1;
    }

    .card__header {
        display: flex;
        flex-direction: column;
    }

    .card__footer {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        padding: 0 var(--space-horizontal-sm);
    }

    /* Медиазапросы */

    @media (min-width: 480px) {
        .card {
            border-radius: var(--radius-sm);
            padding: 0;
        }
        .card__content {
            gap: var(--space-vertical-xs);
            padding: 0 var(--space-horizontal-sm);
        }
        .card__footer {
            display: flex;
            padding: 0 var(--space-horizontal-sm) var(--space-vertical-sm);
        }
    }
    /* 768px — карточка ~237 */
    @media (min-width: 768px) {
    }

    /* 992px — карточка ~309 */
    @media (min-width: 992px) {
    }

    /* 1200px — карточка ~280 */
    @media (min-width: 1200px) {
    }

    /* 1440px — карточка ~268 */
    @media (min-width: 1440px) {
    }
</style>
