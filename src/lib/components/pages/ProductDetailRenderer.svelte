<script>
    import { detailComponents } from "$lib/components/blocks/detailComponents.js";
    import { appConfig } from "$lib/config/app.config";

    export let type;
    export let lang;
    export let item;
    export let rating;
    export let reviewsCount;

    const config = appConfig.collections[type]?.detailPage;

    // список секций по типу
    const sections = config?.sections ?? [];

    // универсальная функция выбора данных
    /**
     * Универсальная функция для подготовки пропсов для любого блока
     * @param {object} uses - конфигурация блока (fields, title, icon и др.)
     * @param {object} item - данные элемента
     * @param {object} system - системные данные (rating, reviewsCount, lang и т.п.)
     */
    function getProps(section, item = {}, system = {}) {
        const props = {};

        // 1. Копируем все ключи, кроме fields (вдруг будут доп. параметры)
        for (const key in section) {
            if (key !== "fields") props[key] = section[key];
        }

        // 2. Преобразуем fields в [{ key, value }]
        if (Array.isArray(section.fields)) {
            props.fields = section.fields.map((field) => ({
                key: field,
                value: item[field] ?? system[field],
            }));
        }

        return props;
    }
</script>

<div class="content">
    {#each sections as section}
        {#if detailComponents[section.component]}
            <svelte:component
                this={detailComponents[section.component]}
                props={getProps(section, item, {
                    type,
                    lang,
                    rating,
                    reviewsCount,
                })}
            />
        {/if}
    {/each}
</div>

<style>
    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 0px;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: auto;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        gap: var(--space-vertical-sm);
    }
</style>
