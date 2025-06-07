<a href="/" class="logo" nofollow aria-label="На главную">
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
    }
    .logo:hover {
        color: var(--color-primary-hover);
    }

    .target {
        position: relative;
        height: 100%;
        aspect-ratio: 1 / 1;
    }
    .ring {
        position: absolute;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transition: background-color var(--transition-normal);
    }

    .ring1 {
        width: 100%;
        height: 100%;
        background: var(--color-secondary);
    }
    .ring2 {
        width: 80%;
        height: 80%;
        background: var(--color-bg);
    }
    .ring3 {
        width: 60%;
        height: 60%;
        background: var(--color-secondary);
    }
    .ring4 {
        width: 40%;
        height: 40%;
        background: var(--color-bg);
    }
    .ring5 {
        width: 20%;
        height: 20%;
        background: var(--color-secondary);
    }

    .logo:hover .ring1,
    .logo:hover .ring3,
    .logo:hover .ring5 {
        background-color: var(--color-primary-hover);
    }

    @media (max-width: 570px) {
        .logo_title {
            display: none;
        }
    }
</style>
