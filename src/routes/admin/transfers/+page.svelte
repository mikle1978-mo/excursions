<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { locale } from "$lib/stores/locale.js";
    import IconPlus from "$lib/icons/IconPlus.svelte";
    import IconDelete from "$lib/icons/IconDelete.svelte";
    import IconEdit from "$lib/icons/IconEdit.svelte";
    import IconCopy from "$lib/icons/IconCopy.svelte";
    import {
        deleteTransfer,
        duplicateTransfer,
        toggleTransferActive,
    } from "$lib/utils/transfersActions.js";

    export let data;
    let transfers = structuredClone(data.transfers);

    let isLoading = false;

    onMount(async () => {});

    async function handleToggle(index) {
        const item = transfers[index];
        const newActive = !item.active;
        const actionText = newActive ? "включить" : "выключить";

        const confirmed = confirm(
            `Ты точно хочешь ${actionText} трансфер "${item.slug}"?`
        );
        if (!confirmed) return;

        try {
            await toggleExcursionActive(item.slug, newActive);
            transfers[index].active = newActive;
            transfers = [...transfers]; // триггерим реактивность
        } catch (err) {
            alert(`Ошибка: ${err.message}`);
        }
    }

    function handleAdd() {
        goto("/admin/transfers/new");
    }

    function handleEdit(slug) {
        // тут может быть переход на страницу редактирования
        goto(`/admin/transfers/${slug}`);
    }

    async function handleDuplicate(slug) {
        const newSlug = await duplicateTransfer(slug);
        if (newSlug) {
            location.reload();
        }
    }

    async function handleDelete(slug) {
        const success = await deleteTransfer(slug);
        if (success) {
            location.reload();
        }
    }
</script>

<div class="admin-page">
    <div class="admin-title">
        <span>Список трансферов</span>
        <button class="add-button" on:click={handleAdd}>
            <IconPlus />
        </button>
    </div>

    {#if isLoading}
        <p>Загрузка...</p>
    {:else if transfers.length === 0}
        <p>Нет трансферов</p>
    {:else}
        <div class="list">
            {#each transfers as transfer, i}
                <div class="item">
                    <input
                        type="checkbox"
                        checked={transfer.active}
                        on:change={() => handleToggle(i)}
                    />

                    <a class="title" href={`/admin/transfers/${transfer.slug}`}>
                        {transfer.slug}
                    </a>
                    <div>{transfer.price}$</div>
                    <div class="button-group">
                        <button
                            class="edit-button"
                            on:click={() => handleEdit(transfer.slug)}
                            aria-label="Редактировать"
                        >
                            <IconEdit />
                        </button>
                        <button
                            class="copy-button"
                            on:click={() => handleDuplicate(transfer.slug)}
                        >
                            <IconCopy />
                        </button>
                        <button
                            class="delete-button"
                            on:click={() => handleDelete(transfer.slug)}
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

    .list {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }

    .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }
    @media (prefers-color-scheme: dark) {
        .item {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }

    .title {
        width: 70%;
        font-size: var(--text-md);
        font-weight: 500;
    }
    .title:hover {
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
