<script>
    import { onMount } from "svelte";
    import Modal from "$lib/components/UI/Modal.svelte";
    import { locale } from "$lib/stores/locale";
    import { gallery_texts } from "$lib/i18n/gallery";
    import { getCloudinarySrcset } from "$lib/utils/optimizeCloudinary.js";
    const defaultImage = `/images/excursions/excursion_default.webp`;

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

    // Для главного изображения вычисляем src и srcset
    $: mainSrcset = images[selectedIndex]
        ? getCloudinarySrcset(
              images[selectedIndex].url,
              [200, 400, 600, 800, 980]
          )
        : { src: "", srcset: "" };

    // Массив с src и srcset для всех миниатюр
    $: thumbs = images.map((img) =>
        getCloudinarySrcset(img.url, [100, 150, 200])
    );

    // Вычисляем src и srcset для модальных изображений (например, более большие размеры)
    $: modalImages = images.map((img) =>
        getCloudinarySrcset(img.url, [600, 900, 1200, 1600])
    );

    function onImageError(event) {
        console.log(`Image error for ${event.target.src}`);

        if (event.target.src !== defaultImage) {
            event.target.src = defaultImage;
            event.target.srcset = "";
        }
    }
</script>

<div class="image-gallery">
    <button
        type="button"
        class="main-image"
        onclick={openModal}
        aria-label={gallery_texts.open_gallery[$locale]}
    >
        <img
            src={mainSrcset.src}
            srcset={mainSrcset.srcset}
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={title
                ? getAltText(selectedIndex)
                : gallery_texts.default_alt[$locale]}
            decoding="async"
            width="600"
            height="337"
            loading="lazy"
            onerror={onImageError}
        />
    </button>

    <div class="thumbnails">
        {#each images as img, i}
            <button
                type="button"
                class:selected={i === selectedIndex}
                onclick={() => selectImage(i)}
                aria-label={getSelectImageLabel(i)}
                class="thumbnail-button"
            >
                <img
                    src={thumbs[i].src}
                    srcset={thumbs[i].srcset}
                    sizes="(max-width: 600px) 50px, 100px"
                    alt={getAltText(i)}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="225"
                    onerror={onImageError}
                />
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
                        <img
                            src={modalImages[i].src}
                            srcset={modalImages[i].srcset}
                            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 1200px"
                            alt={getAltText(i)}
                            loading="eager"
                            decoding="async"
                            width="600"
                            height="337"
                        />
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
        width: 100%;
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
        max-width: 980px;
        aspect-ratio: 16 / 9;
        height: auto;
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
        aspect-ratio: 16 / 9;
        object-fit: cover;
        width: auto;
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
