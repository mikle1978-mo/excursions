<script>
    import { goto } from "$app/navigation";
    import IconPlus from "$lib/icons/IconPlus.svelte";
    import IconEdit from "$lib/icons/IconEdit.svelte";
    import IconDelete from "$lib/icons/IconDelete.svelte";
    import IconCopy from "$lib/icons/IconCopy.svelte";
    import IconDownload from "$lib/icons/IconDownload.svelte";

    import {
        deleteFaq,
        duplicateFaq,
        importFaqs,
    } from "$lib/utils/faqActions.js";

    export let data;
    const { faqs } = data;

    function handleAdd() {
        goto("/admin/faq/new");
    }

    function handleEdit(id) {
        goto(`/admin/faq/${id}`);
    }

    async function handleDelete(id) {
        const ok = confirm("Удалить этот FAQ?");
        if (ok) {
            const success = await deleteFaq(id);
            if (success) {
                location.reload();
            }
        }
    }

    async function handleDuplicate(id) {
        const success = await duplicateFaq(id);
        if (success) {
            location.reload();
        }
    }

    function handleExport() {
        fetch("/api/faq/export")
            .then((res) => res.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "faqs-export.json";
                a.click();
                URL.revokeObjectURL(url);
            })
            .catch(() => alert("Ошибка при экспорте FAQ"));
    }

    async function handleImport(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        const text = await file.text();

        let jsonData;
        try {
            jsonData = JSON.parse(text);
        } catch (e) {
            alert("Некорректный JSON файл");
            return;
        }

        const res = await fetch("/api/faq/import", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });

        const result = await res.json();
        if (!res.ok) {
            alert(result.error || "Ошибка при импорте");
        } else {
            alert(
                `Импорт завершён. Обновлено: ${result.updated}, Добавлено: ${result.inserted}`
            );
            location.reload();
        }
    }
</script>

<div class="admin-page">
    <div class="admin-title">
        <span>Список FAQ</span>
        <div class="button-group">
            <button class="add-button" on:click={handleAdd}>
                <IconPlus />
            </button>
            <label class="upload-button">
                <IconDownload />
                <input
                    type="file"
                    accept="application/json"
                    on:change={(e) => handleImport(e)}
                    hidden
                />
            </label>
            <button on:click={handleExport}>Экспорт FAQ в JSON</button>
        </div>
    </div>

    {#if faqs.length === 0}
        <p>Нет записей FAQ</p>
    {:else}
        <div class="faq-list">
            {#each faqs as faq}
                <div class="faq-item">
                    <span class="faq-question"
                        >{faq.question?.ru || "— Без вопроса —"}</span
                    >
                    <div class="button-group">
                        <button
                            class="edit-button"
                            on:click={() => handleEdit(faq._id)}
                        >
                            <IconEdit />
                        </button>
                        <button
                            class="copy-button"
                            on:click={() => handleDuplicate(faq._id)}
                        >
                            <IconCopy />
                        </button>
                        <button
                            class="delete-button"
                            on:click={() => handleDelete(faq._id)}
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

    .faq-list {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }

    .faq-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
    }

    .faq-question {
        font-weight: 500;
        max-width: 70%;
    }

    .button-group {
        display: flex;
        gap: 0.5rem;
    }

    .add-button,
    .edit-button,
    .delete-button,
    .copy-button,
    .upload-button {
        width: 1.75rem;
        height: 1.75rem;
        background-color: var(--color-warning);
        color: var(--color-text);
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
    }

    .add-button {
        background-color: var(--color-secondary);
        border-radius: var(--radius-full);
    }

    .copy-button {
        background-color: var(--color-primary);
    }

    .delete-button {
        background-color: var(--color-error);
    }

    .upload-button {
        background-color: var(--color-info, #2d9cdb);
        position: relative;
        overflow: hidden;
    }

    .add-button:hover,
    .edit-button:hover,
    .delete-button:hover,
    .copy-button:hover,
    .upload-button:hover {
        background-color: var(--color-gray-600);
    }

    .upload-button input {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
</style>
