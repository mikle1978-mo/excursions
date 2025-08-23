<script>
    import { locale, getLocalizedPath } from "$lib/stores/locale.js";
    import { footer_list } from "$lib/i18n/footer_list";
    import { page } from "$app/stores";
    import { sidebarOpen } from "$lib/stores/sidebar";
    import IconFilter from "$lib/icons/IconFilter.svelte";
</script>

<button class="filter-button" on:click={() => sidebarOpen.set(true)}>
    <IconFilter />
</button>

<style>
    .filter-button {
        width: 32px;
        height: 32px;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
        font-size: var(--text-sm);
        color: var(--color-gray-500);
        background: var(--color-bg);
        border: 2px solid var(--color-gray-500);
        border-radius: var(--radius-full);
        padding: 0;
        box-shadow: var(--shadow-sm);
        transition: all var(--transition-normal);
        cursor: pointer;
    }

    .filter-button:hover {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
        background: var(--color-bg);
    }
</style>
