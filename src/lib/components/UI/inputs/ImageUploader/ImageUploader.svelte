<script>
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    import MyButton from "../../buttons/MyButton.svelte";
    import { dndzone } from "svelte-dnd-action";

    export let images = [];
    export let label = "Фотографии:";
    export let folder = "default";
    export let placeholder = "Выберите изображения";
    export let field = "";
    export let errors = {};

    let selectedFiles = [];
    let previews = [];
    let isUploading = false;

    // Гарантируем уникальные ID для всех изображений
    $: images = images.map((img) => ({
        ...img,
        id:
            img.id ||
            img.public_id ||
            `img-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    }));

    function handleFileChange(event) {
        selectedFiles = event.target.files;
        previews = Array.from(selectedFiles).map((file, i) => ({
            id: `preview-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
            url: URL.createObjectURL(file),
            name: file.name,
            file,
        }));
    }

    async function uploadImages() {
        isUploading = true;
        const uploads = previews.map(async (preview) => {
            const formData = new FormData();
            formData.append("file", preview.file);
            formData.append("folder", folder);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            images = [
                ...images,
                {
                    url: data.url,
                    public_id: data.public_id,
                    id:
                        data.public_id ||
                        `img-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
                },
            ];
        });

        await Promise.all(uploads);
        selectedFiles = [];
        previews = [];
        isUploading = false;
    }

    async function removeImage(image) {
        try {
            if (image.public_id) {
                const res = await fetch(
                    `/api/upload?public_id=${encodeURIComponent(image.public_id)}`,
                    { method: "DELETE" }
                );
                if (!res.ok) throw new Error("Ошибка сервера");
            }
            images = images.filter((img) => img.id !== image.id);
        } catch (err) {
            alert("Ошибка удаления изображения.");
        }
    }

    function removePreview(id) {
        previews = previews.filter((preview) => preview.id !== id);
    }

    function handleDndConsider(event) {
        images = event.detail.items;
    }

    function handleDndFinalize(event) {
        images = event.detail.items;
    }
</script>

<div class="label">
    <slot>{label}</slot>

    <div class="images-input">
        <div class="input-group">
            <input
                type="file"
                multiple
                accept="image/*"
                on:change={handleFileChange}
                aria-label={placeholder}
            />
        </div>

        {#if previews.length}
            <div class="preview-list">
                <h4>В очереди:</h4>
                {#each previews as preview (preview.id)}
                    <div class="item image">
                        <img src={preview.url} alt={preview.name} />
                        <div class="actions">
                            <button
                                on:click={() => removePreview(preview.id)}
                                type="button"
                                class="clear-btn">×</button
                            >
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
        <MyButton
            width="width-auto"
            onclick={uploadImages}
            size="xs"
            type="button"
            disabled={isUploading || !previews.length}
        >
            {isUploading ? "Загрузка..." : "Загрузить"}
        </MyButton>

        {#if images.length}
            <h4>Загруженные (перетащите для сортировки):</h4>
            <div
                class="items-list"
                use:dndzone={{ items: images }}
                on:consider={handleDndConsider}
                on:finalize={handleDndFinalize}
            >
                {#each images as img (img.id)}
                    <div class="item image" data-id={img.id}>
                        <img src={img.url} alt="" />
                        <div class="actions">
                            <button
                                on:click={() => removeImage(img)}
                                type="button"
                                class="clear-btn">×</button
                            >
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>

<ErrorMessage {field} {errors} />

<style>
    .label {
        display: flex;
        flex-direction: column;
        font-size: var(--text-sm);
        gap: 0.3rem;
    }
    .images-input {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .input-group {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }
    input[type="file"] {
        flex: 1;
        font-size: var(--text-md);
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-bg);
        padding: 0.4rem 0.6rem;
        color: var(--color-text);
        cursor: pointer;
    }
    input[type="file"]::file-selector-button {
        font-family: inherit;
        font-weight: 500;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: var(--transition-fast);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
        border: none;
        line-height: var(--line-height-base);
        position: relative;
        overflow: hidden;
        background-color: var(--color-primary);
        color: var(--color-light);
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        font-size: var(--text-xs);
    }
    input[type="file"]::file-selector-button:hover {
        background-color: var(--color-primary-hover);
    }
    .preview-list,
    .items-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: var(--space-vertical-md) var(--space-vertical-sm);
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-gray-100);
    }
    h4 {
        width: 100%;
        margin: 0 0 0.3rem 0;
        font-size: 0.95rem;
        color: var(--color-gray-600);
    }
    .item.image {
        background: var(--color-bg);
        padding: 0.3rem;
        border-radius: 6px;
        position: relative;
        width: 100px;
        height: 100px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .item.image img {
        max-width: 100%;
        max-height: 100%;
        object-fit: cover;
        border-radius: 4px;
    }
    .actions {
        position: absolute;
        top: 2px;
        right: 2px;
    }
    .clear-btn {
        background: none;
        border: none;
        color: var(--color-gray-500);
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.2rem;
        border-radius: var(--radius-full);
        transition:
            color 0.2s,
            background 0.2s;
    }
    .clear-btn:hover {
        color: var(--color-error);
        background: var(--color-gray-100);
    }
</style>
