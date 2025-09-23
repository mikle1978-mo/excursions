<script>
    import { locale, getLocalizedPath } from "$lib/stores/locale";
</script>

<a href={getLocalizedPath($locale)} class="logo" aria-label="go main">
    <div class="target">
        <div class="ring ring1"></div>
        <div class="ring ring2"></div>
        <div class="ring ring3"></div>
        <div class="ring ring4"></div>
        <div class="ring ring5"></div>
    </div>

    <span class="logo_title">Kemer.app</span>
</a>

<style>
    .logo {
        position: relative;
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        font-size: 2rem;
        transition: all var(--transition-normal);
        height: 100%;
        color: var(--color-secondary);
        text-decoration: none;
    }

    .logo:hover {
        color: var(--color-primary-hover);
    }

    .logo_title {
        font-size: var(--text-lg);
    }

    .target {
        position: relative;
        width: 32px;
        height: 32px;
        min-width: 32px;
        min-height: 32px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ring {
        position: absolute;
        border-radius: 50%;
        background-color: var(--color-secondary);
        transition: background-color var(--transition-normal);
    }

    .ring1 {
        width: 100%;
        height: 100%;
    }

    .ring2 {
        width: 80%;
        height: 80%;
        background-color: var(--color-bg);
    }

    .ring3 {
        width: 60%;
        height: 60%;
    }

    .ring4 {
        width: 40%;
        height: 40%;
        background-color: var(--color-bg);
    }

    .ring5 {
        width: 20%;
        height: 20%;
    }

    /* Ховер-анимация */
    .logo:hover .ring1,
    .logo:hover .ring3,
    .logo:hover .ring5 {
        background-color: var(--color-primary-hover);
    }

    /* Скрываем текст на узких экранах */
    @media (max-width: 570px) {
        .logo_title {
            display: none;
        }
    }
</style>
