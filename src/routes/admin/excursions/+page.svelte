<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { locale } from "$lib/stores/locale.js";
    import IconPlus from "$lib/icons/IconPlus.svelte";
    import IconDelete from "$lib/icons/IconDelete.svelte";
    import IconEdit from "$lib/icons/IconEdit.svelte";
    import IconCopy from "$lib/icons/IconCopy.svelte";
    import {
        deleteExcursion,
        duplicateExcursion,
        toggleExcursionActive,
    } from "$lib/utils/excursionsActions.js";
    import ExportCSVButton from "$lib/components/UI/buttons/ExportCSVButton.svelte";

    export let data;
    let excursions = structuredClone(data.excursions);
    let translations = structuredClone(data.translations);

    let isLoading = false;

    onMount(async () => {});

    async function handleToggle(index) {
        const item = excursions[index];
        const newActive = !item.active;
        const actionText = newActive ? "включить" : "выключить";

        const confirmed = confirm(
            `Ты точно хочешь ${actionText} экскурсию "${item.slug}"?`
        );
        if (!confirmed) return;

        try {
            await toggleExcursionActive(item.slug, newActive);
            excursions[index].active = newActive;
            excursions = [...excursions];
        } catch (err) {
            alert(`Ошибка: ${err.message}`);
        }
    }

    function handleAdd() {
        goto("/admin/excursions/new");
    }

    function handleEdit(slug) {
        // тут может быть переход на страницу редактирования
        goto(`/admin/excursions/${slug}`);
    }

    async function handleDuplicate(slug) {
        const newSlug = await duplicateExcursion(slug);
        if (newSlug) {
            location.reload();
        }
    }

    async function handleDelete(slug) {
        const success = await deleteExcursion(slug);
        if (success) {
            location.reload();
        }
    }

    // Создаём карту переводов для русского языка
    const translationsMap = new Map();
    for (const t of translations) {
        if (t.lang === "ru") {
            translationsMap.set(t.itemSlug, t.title);
        }
    }

    // Маппим экскурсии с русским названием
    $: mappedExcursions = excursions.map((e) => ({
        slug: e.slug,
        active: e.active ? "Да" : "Нет",
        price: e.price,
        title_ru: translationsMap.get(e.slug) || "",
    }));

    const columnMap = {
        slug: "Slug",
        title_ru: "Название (RU)",
        active: "Активна",
        price: "Цена",
    };
</script>

<div class="admin-page">
    <div class="admin-title">
        <span>Список экскурсий</span>
        <button class="add-button" on:click={handleAdd}>
            <IconPlus />
        </button>
        <ExportCSVButton
            items={mappedExcursions}
            fileName="excursions"
            {columnMap}
            label="Скачать CSV"
        />
    </div>

    {#if isLoading}
        <p>Загрузка...</p>
    {:else if excursions.length === 0}
        <p>Нет экскурсий</p>
    {:else}
        <div class="excursion-list">
            {#each excursions as excursion, i}
                <div class="excursion-item">
                    <input
                        type="checkbox"
                        checked={excursion.active}
                        on:change={() => handleToggle(i)}
                    />

                    <a
                        class="excursion-title"
                        href={`/admin/excursions/${excursion.slug}`}
                    >
                        {excursion.slug}
                    </a>
                    <div>{excursion.price}$</div>
                    <div class="button-group">
                        <button
                            class="edit-button"
                            on:click={() => handleEdit(excursion.slug)}
                            aria-label="Редактировать"
                        >
                            <IconEdit />
                        </button>
                        <button
                            class="copy-button"
                            on:click={() => handleDuplicate(excursion.slug)}
                        >
                            <IconCopy />
                        </button>
                        <button
                            class="delete-button"
                            on:click={() => handleDelete(excursion.slug)}
                            aria-label="Удалить"
                        >
                            <IconDelete />
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .admin-page {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    .admin-title {
        font-size: var(--text-xl);
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .excursion-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }

    .excursion-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }
    @media (prefers-color-scheme: dark) {
        .excursion-item {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }

    .excursion-title {
        width: 70%;
        font-size: var(--text-md);
        font-weight: 500;
    }
    .excursion-title:hover {
        text-decoration: underline;
    }

    .button-group {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .add-button,
    .edit-button,
    .delete-button,
    .copy-button {
        width: 1.75rem;
        height: 1.75rem;
        background-color: var(--color-warning);
        color: var(--color-text);
        border: none;
        border-radius: var(--radius-sm);
        padding: var(--space-horizontal-xxs);
        cursor: pointer;
        font-size: var(--text-sm);
        transition: background-color var(--transition-fast);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-button {
        border-radius: var(--radius-full);
        background-color: var(--color-secondary);
    }

    .copy-button {
        background-color: var(--color-primary);
    }
    .delete-button {
        background-color: var(--color-error, #e53935);
    }
    .add-button:hover,
    .edit-button:hover,
    .delete-button:hover,
    .copy-button:hover {
        background-color: var(--color-gray-600);
    }
</style>
