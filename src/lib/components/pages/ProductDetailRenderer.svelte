<!-- src\lib\components\pages\ProductDetailRenderer.svelte 

CONFIG        → что рендерить
NORMALIZER    → привести входные данные
ADAPTER       → бизнес-логика
VIEWMODEL     → UI-реактивность (ТОЛЬКО ТУТ)
BLOCK         → отрисовать
SYSTEM        → контекст
-->

<script>
    import { detailComponents } from "$lib/components/blocks/page/detailComponents.js";
    import { appConfig } from "$lib/config/app.config";
    import Modal from "$lib/components/UI/Modal.svelte";
    import ShortForm from "$lib/components/UI/forms/shortForm.svelte";

    export let type;
    export let lang;
    export let item;

    const system = { lang, type };

    const config = appConfig.collections[type]?.detailPage;

    // список секций по типу
    const sections = config?.sections ?? [];

    function getData(section) {
        // 1. адаптер
        if (typeof section.adapter === "function") {
            return section.adapter({ item, system, section });
        }

        // 2. fields
        const result = {};
        if (!section.fields) return result;

        for (const [key, source] of Object.entries(section.fields)) {
            result[key] = normalizeValue(source, item, lang);
        }
        return result;
    }

    function normalizeValue(source, item, lang) {
        // 1. строка → ключ item
        if (typeof source === "string") {
            return item[source] ?? null;
        }

        // 2. локализованный объект { ru, en }
        if (
            typeof source === "object" &&
            source !== null &&
            !Array.isArray(source) &&
            lang in source
        ) {
            return source[lang] ?? null;
        }

        return source ?? null;
    }

    let isBookingOpen = false;

    function handleAction(action) {
        if (action === "openBookingModal") {
            isBookingOpen = true;
        }
    }
</script>

{#if isBookingOpen}
    <Modal on:close={() => (isBookingOpen = false)}>
        <ShortForm slug={item.slug} />
    </Modal>
{/if}

<div class="content">
    {#each sections as section}
        {#if detailComponents[section.component]}
            <svelte:component
                this={detailComponents[section.component]}
                data={getData(section, item, lang)}
                {system}
                style={section.style || {}}
                onAction={section.action
                    ? () => handleAction(section.action)
                    : undefined}
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
