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

    // Функция генерации уникального id
    function generateId() {
        return `img-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    }

    // Локальная нормализация изображений — все объекты имеют id
    $: normalizedImages = images.map((img) => ({
        ...img,
        id: img.id || img.public_id || generateId(),
    }));

    function handleFileChange(event) {
        selectedFiles = Array.from(event.target.files);
        previews = selectedFiles.map((file, i) => ({
            id: `preview-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`,
            url: URL.createObjectURL(file),
            name: file.name,
            file,
        }));
    }

    async function uploadImages() {
        if (!previews.length) return;
        isUploading = true;

        try {
            const uploaded = await Promise.all(
                previews.map(async (preview) => {
                    const formData = new FormData();
                    formData.append("file", preview.file);
                    formData.append("folder", folder);

                    const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });
                    if (!res.ok) {
                        const text = await res.text();
                        throw new Error(`Upload failed: ${res.status} ${text}`);
                    }

                    const data = await res.json();
                    return {
                        url: data.url,
                        public_id: data.public_id,
                        id: data.public_id || generateId(),
                    };
                })
            );

            images = [...images, ...uploaded];

            previews.forEach((p) => URL.revokeObjectURL(p.url));
            previews = [];
            selectedFiles = [];
        } catch (err) {
            console.error(err);
            alert("Ошибка загрузки изображения: " + (err.message || err));
        } finally {
            isUploading = false;
        }
    }

    async function removeImage(image) {
        const previousImages = [...images];
        images = images.filter((img) => img.id !== image.id);

        if (!image.public_id) return;

        try {
            const res = await fetch(
                `/api/upload?public_id=${encodeURIComponent(image.public_id)}`,
                { method: "DELETE" }
            );
            if (!res.ok && res.status !== 404 && res.status !== 410) {
                const text = await res.text();
                throw new Error(`Server delete failed: ${res.status} ${text}`);
            }
        } catch (err) {
            console.error(err);
            images = previousImages; // rollback
            alert("Ошибка удаления изображения: " + (err.message || err));
        }
    }

    function removePreview(id) {
        previews = previews.filter((p) => p.id !== id);
    }

    function handleDnd(event) {
        // Перезаписываем исходный массив images
        images = event.detail.items.map((item) => ({
            ...item,
            id: item.id || generateId(),
        }));
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
                                type="button"
                                class="clear-btn"
                                on:click={() => removePreview(preview.id)}
                                >×</button
                            >
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        <MyButton
            width="half"
            onclick={uploadImages}
            size="xs"
            type="button"
            disabled={isUploading || !previews.length}
        >
            {isUploading ? "Загрузка..." : "Загрузить"}
        </MyButton>

        {#if normalizedImages.length}
            <h4>Загруженные (перетащите для сортировки):</h4>
            <div
                class="items-list"
                use:dndzone={{ items: normalizedImages }}
                on:consider={handleDnd}
                on:finalize={handleDnd}
            >
                {#each normalizedImages as img (img.id)}
                    <div class="item image" data-id={img.id}>
                        <img src={img.url} alt="" />
                        <div class="actions">
                            <button
                                type="button"
                                class="clear-btn"
                                on:click={() => removeImage(img)}>×</button
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
