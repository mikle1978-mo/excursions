<script>
    import IconPlus from "$lib/icons/IconPlus.svelte";
    import IconEdit from "$lib/icons/IconEdit.svelte";
    import IconCopy from "$lib/icons/IconCopy.svelte";
    import IconDelete from "$lib/icons/IconDelete.svelte";
    import ExportCSVButton from "$lib/components/UI/buttons/ExportCSVButton.svelte";
    import { LIST_COLUMNS } from "$lib/constants/listAdminFields";
    import { goto } from "$app/navigation";
    import MyButton from "../UI/buttons/MyButton.svelte";
    import {
        deleteItem,
        duplicateItem,
        toggleItemActive,
    } from "$lib/utils/itemsActions.js";

    export let items = [];

    export let type = "excursions";
    export let columnMap = LIST_COLUMNS;

    let sortKey = "slug";
    let sortDirection = "asc"; // или "desc"

    function handleAdd() {
        if (confirm("Добавить элемент?")) {
            goto(`/admin/${type}/new`);
        }
    }

    function handleEdit(slug) {
        goto(`/admin/${type}/${slug}`);
    }

    async function handleDelete(slug) {
        if (confirm("Удалить элемент?")) {
            const success = await deleteItem(type, slug);
            if (success) location.reload();
        }
    }

    async function handleDuplicate(slug) {
        const newSlug = await duplicateItem(type, slug);
        if (newSlug) location.reload();
    }

    async function handleToggle(index) {
        const item = sortedItems[index];
        const newActive = !item.active;
        if (
            confirm(
                `Ты точно хочешь ${newActive ? "включить" : "выключить"} "${item.slug}"?`
            )
        ) {
            await toggleItemActive(type, item.slug, newActive);
            item.active = newActive;
            sortedItems = [...sortedItems];
        }
    }

    function toggleSort(key) {
        if (sortKey === key) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortKey = key;
            sortDirection = "asc";
        }
    }

    $: sortedItems = [...items].sort((a, b) => {
        const aVal = a[sortKey] ?? "";
        const bVal = b[sortKey] ?? "";
        const modifier = sortDirection === "asc" ? 1 : -1;
        if (typeof aVal === "number" && typeof bVal === "number") {
            return (aVal - bVal) * modifier;
        }
        return aVal.toString().localeCompare(bVal.toString()) * modifier;
    });

    $: mappedItems = sortedItems.map((item) => {
        const mapped = {};
        for (const key in columnMap) {
            mapped[key] =
                typeof item[key] === "boolean"
                    ? item[key]
                        ? "Да"
                        : "Нет"
                    : item[key];
        }
        return mapped;
    });
</script>

<div class="admin-page">
    <div class="admin-title">
        <span>Список: {type}</span>
        <div class="admin-actions">
            <MyButton
                size="xs"
                variant="outline"
                onclick={goto.bind(null, "/admin")}
            >
                Админка</MyButton
            >

            <MyButton size="xs" variant="secondary" onclick={handleAdd}
                >Добавить</MyButton
            >

            <ExportCSVButton
                items={mappedItems}
                fileName={type}
                {columnMap}
                label="Скачать CSV"
                size="xs"
                variant="primary"
            />
        </div>
    </div>

    {#if items.length === 0}
        <p>Нет данных</p>
    {:else}
        <table class="admin-table">
            <thead>
                <tr>
                    <th></th>
                    {#each Object.keys(columnMap) as key}
                        <th on:click={() => toggleSort(key)} class="sortable">
                            {columnMap[key]}
                            {sortKey === key
                                ? sortDirection === "asc"
                                    ? " ↑"
                                    : " ↓"
                                : ""}
                        </th>
                    {/each}
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {#each sortedItems as item, i}
                    <tr class:item-inactive={!item.active}>
                        <td>
                            <input
                                id={`toggle-${i}`}
                                type="checkbox"
                                checked={item.active}
                                on:change={() => handleToggle(i)}
                            />
                        </td>
                        {#each Object.keys(columnMap) as key}
                            <td>
                                {#if key === "slug"}
                                    <a
                                        class="item-link"
                                        href={`/admin/${type}/${item.slug}`}
                                    >
                                        {item[key]}
                                    </a>
                                {:else if key === "price"}
                                    {item[key] ? `$ ${item[key]}` : "—"}
                                {:else}
                                    {item[key] ?? "—"}
                                {/if}
                            </td>
                        {/each}
                        <td class="action-buttons">
                            <button
                                class="edit-button"
                                on:click={() => handleEdit(item.slug)}
                            >
                                <IconEdit />
                            </button>
                            <button
                                class="copy-button"
                                on:click={() => handleDuplicate(item.slug)}
                            >
                                <IconCopy />
                            </button>
                            <button
                                class="delete-button"
                                on:click={() => handleDelete(item.slug)}
                            >
                                <IconDelete />
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
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
    .admin-actions {
        display: flex;
        gap: var(--space-horizontal-xs);
    }

    table.admin-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 0.5rem;
        font-size: var(--text-xs);
    }

    thead {
        font-weight: bold;
        background-color: var(--color-bg);
    }

    thead th {
        text-align: left;
        padding: 0.75rem 0.5rem;
        user-select: none;
        cursor: pointer;
    }

    tbody td {
        padding: 0 0.5rem;
        background-color: var(--color-bg);
    }

    tbody tr {
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        transition: background-color 0.2s ease;
    }

    tbody tr:hover {
        background-color: var(--color-gray-100);
    }

    @media (prefers-color-scheme: dark) {
        tbody td {
            background-color: var(--color-gray-800);
        }
        tbody tr:hover {
            background-color: var(--color-gray-700);
        }
    }

    tr.item-inactive {
        opacity: 0.5;
        /* или другой стиль, например, фон */
        background-color: var(--color-gray-200);
    }

    @media (prefers-color-scheme: dark) {
        tr.item-inactive {
            background-color: var(--color-gray-700);
        }
    }

    .item-link {
        color: inherit;
        text-decoration: none;
        font-weight: 500;
    }

    .item-link:hover {
        text-decoration: underline;
    }

    .action-buttons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    /* Кнопки */

    .edit-button,
    .delete-button,
    .copy-button {
        width: 1.25rem;
        height: 1.25rem;
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
