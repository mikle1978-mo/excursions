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
    } from "$lib/utils/excursionsActions.js";

    export let data;
    const { excursions } = data;

    let isLoading = false;

    onMount(async () => {});

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
            goto(`/admin/excursions/${newSlug}`);
        }
    }

    async function handleDelete(slug) {
        const success = await deleteExcursion(slug);
        if (success) {
            location.reload();
        }
    }
</script>

<div class="admin-page">
    <div class="admin-title">
        <span>Список экскурсий</span>
        <button class="add-button" on:click={handleAdd}>
            <IconPlus />
        </button>
    </div>

    {#if isLoading}
        <p>Загрузка...</p>
    {:else if excursions.length === 0}
        <p>Нет экскурсий</p>
    {:else}
        <div class="excursion-list">
            {#each excursions as excursion}
                <div class="excursion-item">
                    <div class="excursion-title">
                        {excursion.slug}
                    </div>
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

    .add-button {
        background-color: var(--color-secondary);
        color: white;
        border: none;
        border-radius: var(--radius-sm);
        padding: 0.4rem 0.6rem;
        cursor: pointer;
        font-size: var(--text-md);
        transition: background-color var(--transition-fast);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .add-button:hover {
        background-color: var(--color-gray-600,);
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
        background-color: var(--color-gray-100);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }

    .excursion-title {
        width: 70%;
        font-size: var(--text-md);
        font-weight: 500;
    }

    .button-group {
        display: flex;
        height: calc(var(--text-md) * 2);
        gap: 0.5rem;
    }

    .edit-button,
    .delete-button,
    .copy-button {
        background-color: var(--color-warning);
        color: white;
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

    .copy-button {
        background-color: var(--color-primary);
    }
    .delete-button {
        background-color: var(--color-error, #e53935);
    }

    .edit-button:hover,
    .delete-button:hover,
    .copy-button:hover {
        background-color: var(--color-gray-600);
    }
</style>
