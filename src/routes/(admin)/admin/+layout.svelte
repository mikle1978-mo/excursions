<div class="admin-layout"><slot /></div>

<style>
    .admin-layout {
        padding: 1rem;
        background-color: var(--color-bg);
        height: 100vh; /* Высота на весь экран */
        display: flex; /* Добавляем flex */
        flex-direction: column; /* Вертикальное направление */
    }

    @media (max-width: 600px) {
        .admin-layout {
            padding: 0.5rem;
        }
    }
</style>
