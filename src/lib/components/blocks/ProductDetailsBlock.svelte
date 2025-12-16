<script>
    import { appConfig } from "$lib/config/app.config";
    const config = appConfig?.blocks?.details;

    export let data;
    export let system;
    let lang = system?.lang || "en";

    function getNested(obj, path) {
        return path.split(".").reduce((o, k) => o?.[k] ?? null, obj);
    }

    // Все ключи из config, кроме служебных
    const allConfigKeys = Object.keys(config).filter(
        (k) => k !== "title" && k !== "icon"
    );

    // Только те, что реально присутствуют в data
    const activeFields = allConfigKeys.filter(
        (k) => getNested(data, k) !== null
    );

    function formatValue(value, type, lang) {
        if (type === "boolean") {
            return value
                ? lang === "ru"
                    ? "Да"
                    : "Yes"
                : lang === "ru"
                  ? "Нет"
                  : "No";
        }

        return value;
    }
</script>

<div class="details">
    <h2 class="title-with-icon">
        {#if config.icon}
            <svelte:component this={config?.icon} class="icon" />
        {/if}
        {config?.title[lang]}:
    </h2>
    {#each activeFields as key}
        {#if getNested(data, key)}
            <div class="detail">
                <div class="detail_label">
                    {#if config[key].icon}
                        <svelte:component
                            this={config[key].icon}
                            class="icon"
                        />
                    {/if}

                    <span class="label">
                        {config[key].label[lang]}:
                    </span>
                </div>

                <span class="value">
                    {formatValue(getNested(data, key), config[key]?.type, lang)}
                </span>
            </div>
        {/if}
    {/each}
</div>

<style>
    .details {
        width: 100%;
        /* max-width: 700px; или 800/900 — под твой UI */
        /* margin-right: auto; */
        display: grid;
        gap: 10px;
        padding: 0 var(--space-vertical-sm);
    }
    .title-with-icon {
        display: flex;
        gap: var(--space-vertical-sm);
        align-items: center;
        font-size: var(--text-lg);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }
    .detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 500px; /* или любое подходящее */
        margin: 0 auto; /* центрируем компонент строки */
        width: 100%;
    }
    .detail_label {
        display: flex;
        gap: var(--space-vertical-sm);
        justify-content: space-between;
        align-items: center;
    }
    .value {
        display: flex;
        justify-content: flex-end;
    }
    .label {
        font-weight: 600;
    }
</style>
