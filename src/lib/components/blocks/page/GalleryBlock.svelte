<script>
    import Modal from "$lib/components/UI/Modal.svelte";

    export let data;

    let selectedIndex = 0;
    let isModalOpen = false;

    const openModal = (index) => {
        selectedIndex = index;
        isModalOpen = true;
    };

    const closeModal = () => {
        isModalOpen = false;
    };

    function onImageError(event) {
        if (event.target.src !== data.defaultImage) {
            event.target.src = data.defaultImage;
            event.target.srcset = "";
        }
    }
</script>

<div class="image-collage">
    {#each data.images as img, i}
        <button
            type="button"
            class="collage-item"
            onclick={() => openModal(i)}
            aria-label={data.openLabel}
        >
            <img
                src={img.thumb.src}
                srcset={img.thumb.srcset}
                sizes="(max-width: 768px) 50vw, 200px"
                alt={img.alt}
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
                src={data.images[selectedIndex].modal.src}
                srcset={data.images[selectedIndex].modal.srcset}
                sizes="(max-width: 768px) 95vw, 1200px"
                alt={data.images[selectedIndex].alt}
            />
            <p class="caption">{data.captions[selectedIndex]}</p>
        </div>
    </Modal>
{/if}

<style>
    .image-collage {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        padding: 0;
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
    @media (max-width: 480px) {
        .image-collage {
            padding: 0 var(--space-vertical-sm);
        }
    }
</style>
