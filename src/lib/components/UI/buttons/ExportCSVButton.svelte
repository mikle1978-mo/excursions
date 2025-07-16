<script>
    import { exportToCSV } from "$lib/utils/exportToCSV.js";
    export let items = [];
    export let fileName = "data";
    export let columnMap = null;
    export let label = "Скачать CSV";

    function handleClick() {
        exportToCSV(items, fileName, columnMap);
    }
</script>

<button class="export-button" on:click={handleClick}>
    {label}
</button>

<style>
    .export-button {
        background-color: var(--color-primary);
        color: var(--color-text);
        border: none;
        padding: 0.4rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }
    .export-button:hover {
        background-color: var(--color-primary-hover);
    }
</style>
