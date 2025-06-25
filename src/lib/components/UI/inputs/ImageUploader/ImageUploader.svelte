<script>
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";

    export let images = [];
    export let label = "Фотографии:";
    export let folder = "default";
    export let placeholder = "Выберите изображения";
    export let field = "";
    export let errors = {};

    let selectedFiles = [];
    let previews = [];
    let isUploading = false;

    function handleFileChange(event) {
        selectedFiles = event.target.files;
        previews = Array.from(selectedFiles).map((file) => ({
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
            formData.append("folder", folder); // например: excursions/boat-tour

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            console.log("Upload response:", data);

            images = [...images, { url: data.url, public_id: data.public_id }];
        });

        await Promise.all(uploads);
        selectedFiles = [];
        previews = [];
        isUploading = false;
    }

    async function removeImage(image) {
        const public_id = typeof image === "string" ? null : image.public_id;

        // Если старый формат (строка), просто удаляем из массива
        if (!public_id) {
            images = images.filter((img) => img !== image);
            return;
        }

        // Иначе — удаляем с Cloudinary
        try {
            const res = await fetch(
                `/api/upload?public_id=${encodeURIComponent(public_id)}`,
                {
                    method: "DELETE",
                }
            );

            const result = await res.json();

            if (!res.ok) {
                console.error("Ошибка удаления с Cloudinary:", result.error);
                alert("Ошибка удаления изображения. Попробуйте ещё раз.");
                return;
            }

            // Удаляем из массива
            images = images.filter((img) => img.public_id !== public_id);
        } catch (err) {
            console.error("Ошибка запроса на удаление:", err);
            alert("Ошибка удаления изображения.");
        }
    }

    function removePreview(index) {
        previews = [...previews.slice(0, index), ...previews.slice(index + 1)];
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
                {placeholder}
                on:change={handleFileChange}
                сlass="file-input"
                aria-label="Выберите изображения"
            />
            <button
                on:click={uploadImages}
                type="button"
                class="button"
                disabled={isUploading || !previews.length}
            >
                {isUploading ? "Загрузка..." : "Загрузить"}
            </button>
        </div>

        {#if previews.length}
            <div class="preview-list">
                <h4>В очереди:</h4>
                {#each previews as img, index (img.name)}
                    <div class="item image">
                        <img src={img.url} alt={img.name} />
                        <div class="actions">
                            <button
                                on:click={() => removePreview(index)}
                                type="button"
                                class="clear-btn"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}

        {#if images.length}
            <div class="items-list">
                <h4>Загруженные:</h4>
                {#each images as img, index}
                    <div class="item image">
                        <img src={img.url} alt="Загруженное изображение" />
                        <div class="actions">
                            <button
                                on:click={() => removeImage(img)}
                                type="button"
                                class="clear-btn"
                            >
                                ×
                            </button>
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

    input[type="file"] {
        flex: 1;
        font-size: var(--text-md);
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-light);
        padding: 0.4rem 0.6rem;
        color: var(--color-text);
        cursor: pointer;
        transition:
            border 0.2s,
            box-shadow 0.2s;
    }

    input[type="file"]::file-selector-button {
        background-color: var(--color-primary);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-sm);
        padding: 0.4rem 0.8rem;
        margin-right: 0.6rem;
        font-size: 0.9rem;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    input[type="file"]::file-selector-button:hover {
        background-color: var(--color-primary-hover);
    }

    input[type="file"]:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
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
        background-color: var(--color-light);
        padding: 0.4rem 0.6rem;
        color: var(--color-text);
    }

    .button {
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        font-size: inherit;
        border: none;
        border-radius: 3rem;
        cursor: pointer;
        background-color: var(--color-primary);
        color: var(--color-text);
        transition: 0.3s;
    }

    .button:hover {
        background-color: var(--primary-light);
    }

    .button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
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
