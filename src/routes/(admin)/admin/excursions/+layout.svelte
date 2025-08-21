<div class="admin-layout"><slot /></div>

<style>
    .admin-layout {
        padding: 1rem;
        background-color: var(--color-bg);
        min-height: 100vh;
    }

    @media (max-width: 600px) {
        .admin-layout {
            padding: 0.5rem;
        }
    }
</style>
