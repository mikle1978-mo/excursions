<script>
    import { onMount } from "svelte";
    import Modal from "$lib/components/UI/Modal.svelte";
    import { locale } from "$lib/stores/locale";
    import { gallery_texts } from "$lib/i18n/gallery";

    export let images = [];
    export let title = "";

    let selectedIndex = 0;
    let isModalOpen = false;

    const openModal = () => {
        isModalOpen = true;
    };

    const closeModal = () => {
        isModalOpen = false;
    };

    const selectImage = (index) => {
        selectedIndex = index;
    };

    // Функция для генерации alt-текста
    const getAltText = (index) => {
        return gallery_texts.photo_alt[$locale]
            .replace("{title}", title)
            .replace("{current}", index + 1)
            .replace("{total}", images.length);
    };

    const getCaption = (index) => {
        return gallery_texts.photo_caption[$locale]
            .replace("{title}", title)
            .replace("{current}", index + 1)
            .replace("{total}", images.length);
    };
    // Функция для aria-label кнопок выбора изображения
    const getSelectImageLabel = (index) => {
        return gallery_texts.select_image[$locale].replace("{num}", index + 1);
    };
</script>

<div class="image-gallery">
    <button
        type="button"
        class="main-image"
        on:click={openModal}
        aria-label={gallery_texts.open_gallery[$locale]}
    >
        <img
            src={images[selectedIndex]?.url}
            alt={title
                ? getAltText(selectedIndex)
                : gallery_texts.default_alt[$locale]}
            loading="lazy"
        />
    </button>

    <div class="thumbnails">
        {#each images as img, i}
            <button
                type="button"
                class:selected={i === selectedIndex}
                on:click={() => selectImage(i)}
                aria-label={getSelectImageLabel(i)}
                class="thumbnail-button"
            >
                <img src={img?.url} alt={getAltText(i)} loading="lazy" />
            </button>
        {/each}
    </div>

    {#if isModalOpen}
        <Modal on:close={closeModal}>
            <div class="modal-gallery">
                {#each images as img, i}
                    <div
                        class="modal-image {i === selectedIndex
                            ? 'active'
                            : ''}"
                    >
                        <img src={img?.url} alt={getAltText(i)} />
                        <!-- Исправлено: используем getAltText(i) вместо selectedIndex -->
                        <p class="caption">{getCaption(i)}</p>
                        <!-- Исправлено: используем текущий индекс (i) -->
                    </div>
                {/each}
            </div>
        </Modal>
    {/if}
</div>

<style>
    .image-gallery {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    .main-image {
        cursor: pointer;
        border: none;
        background-color: inherit;
    }

    .main-image img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: var(--radius-md);
        transition: var(--transition-normal);
    }

    .main-image:hover img {
        filter: brightness(0.9);
    }
    .thumbnails {
        display: flex;
        gap: var(--space-vertical-xs);
        overflow-x: auto;
        padding-bottom: var(--space-vertical-xs);
    }
    .thumbnail-button {
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
        opacity: 0.6;
        border-radius: var(--radius-sm);
        transition: var(--transition-normal);
    }

    .thumbnail-button.selected,
    .thumbnail-button:hover {
        opacity: 1;
        box-shadow: var(--shadow-sm);
    }

    .thumbnail-button img {
        height: 60px;
        border-radius: inherit;
        display: block;
    }

    .modal-gallery {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: var(--space-vertical-sm);
    }

    .modal-image img {
        max-width: 90vw;
        max-height: 70vh;
        object-fit: contain;
        border-radius: var(--radius-md);
    }

    .caption {
        margin-top: var(--space-vertical-xs);
        text-align: center;
        color: var(--color-text);
        font-size: var(--text-sm);
    }
</style>
