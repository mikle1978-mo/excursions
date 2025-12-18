<script>
    import { appConfig } from "$lib/config/app.config";
    export let data;
    export let system;

    // Достаём массив значений
    const lang = system?.lang || "en";
    const meetingPoint = data?.meetingPoint || "";

    // Конфиг
    const config = appConfig.blocks?.meeting || {};
    const title = config.title?.[lang] ?? "";
    const Icon = config.icon ?? null;
</script>

{#if meetingPoint}
    <div class="info-block">
        <h2 class="title-with-icon">
            {#if Icon}
                <svelte:component this={Icon} class="icon" />
            {/if}
            {title}:
        </h2>
        <div class="info-list">
            <span>{meetingPoint}</span>
        </div>
    </div>
{/if}

<style>
    .info-block {
        width: 100%;
        background: var(--color-bg);
        padding: var(--space-vertical-sm);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-gray-300);
    }

    .info-block h2 {
        font-size: var(--text-lg);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }
    .title-with-icon {
        display: flex;
        gap: var(--space-vertical-sm);
        justify-content: flex-start;
        align-items: center;
    }

    .info-list {
        list-style: disc inside;
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
    }
    @media (prefers-color-scheme: dark) {
        .info-list {
            color: var(--color-gray-300);
        }
    }
</style>
