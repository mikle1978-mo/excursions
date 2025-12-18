<script>
    import IconImage from "$lib/icons/IconImage.svelte";
    import IconSunrise from "$lib/icons/IconSunrise.svelte";
    import IconLifeBuoy from "$lib/icons/IconLifeBuoy.svelte";
    import IconTruck from "$lib/icons/IconTruck.svelte";
    import IconCompass from "$lib/icons/IconCompass.svelte";
    import IconHelp from "$lib/icons/IconHelp.svelte";
    import IconBookOpen from "$lib/icons/IconBookOpen.svelte";
    import ClearCacheButton from "$lib/components/ui/buttons/ClearCacheButton.svelte";
</script>

<svelte:head>
    <title>Админка</title>
    <meta name="description" content="Админка" />
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="admin-dashboard">
    <h1 class="admin-title">Админка</h1>
    <nav class="admin-links">
        <a href="/admin/excursions" class="admin-link"
            ><IconSunrise />Управление экскурсиями</a
        >
        <a href="/admin/yachts" class="admin-link"
            ><IconLifeBuoy />Управление яхтами</a
        >
        <a href="/admin/cars" class="admin-link"
            ><IconTruck />Управление машинами</a
        >
        <a href="/admin/transfers" class="admin-link"
            ><IconCompass />Управление трансферами</a
        >
        <a href="/admin/faq" class="admin-link"><IconHelp />Управление FAQ</a>
        <a href="/admin/places" class="admin-link"
            ><IconImage />Управление местами</a
        >
        <a href="/admin/blogs" class="admin-link"
            ><IconBookOpen />Управление блогом</a
        >
        <ClearCacheButton />
    </nav>
</main>

<style>
    .admin-dashboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-vertical-md);
        padding: var(--space-vertical-sm) var(--space-horizontal-sm);
    }

    .admin-title {
        font-size: var(--text-xl);
        color: var(--color-primary);
        text-align: center;
    }

    .admin-links {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    .admin-link {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: var(--space-horizontal-sm);
        font-size: var(--text-md);
        padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        background-color: var(--color-secondary);
        color: var(--color-light);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        text-align: center;
        transition: background-color var(--transition-fast);
    }

    .admin-link:hover {
        background-color: var(--color-primary-hover);
    }
</style>
