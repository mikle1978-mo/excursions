<script>
    import { getCloudinarySrcset } from "$lib/utils/optimizeCloudinary.js";
    export let url = "";
    export let alt = "";
    export let widths = [400, 600, 980]; // можно менять при вызове
    export let loading = "lazy";

    const { src, srcset } = getCloudinarySrcset(url, widths);
</script>

<img
    {src}
    {srcset}
    sizes="(max-width: 600px) 100vw, 980px"
    {alt}
    {loading}
    class="img"
/>

<style>
    .img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: var(--radius-md);
        transition: var(--transition-normal);
    }

    .img:hover {
        filter: brightness(0.9);
    }
</style>
