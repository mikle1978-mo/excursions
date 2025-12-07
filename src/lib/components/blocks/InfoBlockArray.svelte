<!-- src/lib/components/blocks/InfoBlockArray.svelte -->
<script>
    import { appConfig } from "$lib/config/app.config";
    export let props;

    // Превращаем fields в объект
    const data = Object.fromEntries(props.fields.map((f) => [f.key, f.value]));

    // Находим ключ массива (любое поле кроме lang)
    const arrayKey = Object.keys(data).find((k) => k !== "lang");

    // Достаём массив значений
    const fields = data[arrayKey] ?? [];
    const lang = data?.lang || "en";
    // Конфиг
    const config = appConfig.blocks.infoArray[arrayKey] || {};
    const title = config.title?.[lang] ?? "";
    const Icon = config.icon ?? null;
</script>

{#if fields.length > 0}
    <div class="info-block">
        <h2 class="title-with-icon">
            {#if Icon}
                <svelte:component this={Icon} class="icon" />
            {/if}
            {title}
        </h2>

        <ul class="info-list">
            {#each fields as row}
                <li>{row}</li>
            {/each}
        </ul>
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
