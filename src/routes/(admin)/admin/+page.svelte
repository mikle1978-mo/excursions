<script>
    // Никаких данных подгружать не нужно на этом этапе
</script>

<svelte:head>
    <title>Админка</title>
    <meta name="description" content="Админка" />
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="admin-dashboard">
    <h1 class="admin-title">Админка</h1>
    <nav class="admin-links">
        <a href="/admin/excursions" class="admin-link">Управление экскурсиями</a
        >
        <a href="/admin/yachts" class="admin-link">Управление яхтами</a>
        <a href="/admin/cars" class="admin-link">Управление машинами</a>
        <a href="/admin/transfers" class="admin-link">Управление трансферами</a>
        <a href="/admin/faq" class="admin-link">Управление FAQ</a>
    </nav>
</main>

<style>
    .admin-dashboard {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--space-vertical-md);
        padding: var(--space-vertical-lg) var(--space-horizontal-md);
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
        font-size: var(--text-md);
        padding: 0.75em 1.5em;
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
