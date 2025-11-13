<script>
    import Modal from "$lib/components/UI/Modal.svelte";
    import { locale } from "$lib/stores/locale";
    import { gallery_texts } from "$lib/i18n/gallery";
    import { getCloudinarySrcset } from "$lib/helpers/optimizeCloudinary.js";

    const defaultImage = `/images/excursions/excursion_default.webp`;

    export let images = [];
    export let title = "";

    let selectedIndex = 0;
    let isModalOpen = false;

    const openModal = (index) => {
        selectedIndex = index;
        isModalOpen = true;
    };

    const closeModal = () => {
        isModalOpen = false;
    };

    const getAltText = (index) =>
        gallery_texts.photo_alt[$locale]
            .replace("{title}", title)
            .replace("{current}", index + 1)
            .replace("{total}", images.length);

    const getCaption = (index) =>
        gallery_texts.photo_caption[$locale]
            .replace("{title}", title)
            .replace("{current}", index + 1)
            .replace("{total}", images.length);

    $: thumbs = images.map((img) => getCloudinarySrcset(img.url, [200, 400]));

    $: modalImages = images.map((img) =>
        getCloudinarySrcset(img.url, [800, 1200, 1600])
    );

    function onImageError(event) {
        if (event.target.src !== defaultImage) {
            event.target.src = defaultImage;
            event.target.srcset = "";
        }
    }
</script>

<div class="image-collage">
    {#each images as img, i}
        <button
            type="button"
            class="collage-item"
            onclick={() => openModal(i)}
            aria-label={gallery_texts.open_gallery[$locale]}
        >
            <img
                src={thumbs[i].src}
                srcset={thumbs[i].srcset}
                sizes="(max-width: 768px) 50vw, 200px"
                alt={getAltText(i)}
                loading="lazy"
                decoding="async"
                onerror={onImageError}
            />
        </button>
    {/each}
</div>

{#if isModalOpen}
    <Modal on:close={closeModal}>
        <div class="modal-gallery">
            <img
                src={modalImages[selectedIndex].src}
                srcset={modalImages[selectedIndex].srcset}
                sizes="(max-width: 768px) 95vw, 1200px"
                alt={getAltText(selectedIndex)}
                loading="eager"
                decoding="async"
            />
            <p class="caption">{getCaption(selectedIndex)}</p>
        </div>
    </Modal>
{/if}

<style>
    .image-collage {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        gap: var(--space-vertical-xs);
    }

    .collage-item {
        padding: 0;
        border: none;
        background: none;
        cursor: pointer;
    }

    .collage-item img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: var(--radius-sm);
        transition: var(--transition-normal);
        display: block;
    }

    .collage-item:hover img {
        filter: brightness(0.9);
    }

    .modal-gallery {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        align-items: center;
    }

    .modal-gallery img {
        aspect-ratio: 16 / 9;
        max-width: 90vw;
        max-height: 80vh;
        object-fit: contain;
        border-radius: var(--radius-md);
    }

    .caption {
        margin-top: var(--space-vertical-xs);
        text-align: center;
        font-size: var(--text-sm);
        color: var(--color-text);
    }
</style>
