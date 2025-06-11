<script>
    import { main_page } from "$lib/i18n/main_page";
    import { locale } from "$lib/stores/locale";
    import MainCard from "$lib/components/main/MainCard.svelte";
</script>

<div class="content">
    <div class="main_page">
        <h1>{@html main_page.title[$locale]}</h1>
        <div class="main-grid">
            {#each main_page.pages as item}
                <MainCard {item} />
            {/each}
        </div>
    </div>
</div>

<style>
    .content {
        display: flex;
        align-items: flex-start;
        padding: 0px;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-top: 1px solid var(--color-gray-500);
        border-bottom: 1px solid var(--color-gray-500);
    }
    .main_page {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
        width: 100%;
    }

    .main-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
        justify-content: space-evenly;
    }
    h1 {
        font-size: var(--text-xxl);
    }
</style>
