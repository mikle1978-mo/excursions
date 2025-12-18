<script>
    import { mobileMenuOpen } from "$lib/stores/mobileMenu";
    $: isNavOpen = $mobileMenuOpen;
</script>

<button
    class="menu burger"
    class:open={isNavOpen}
    onclick={() => mobileMenuOpen.set(!isNavOpen)}
    aria-label="Открыть меню"
>
    <div class="icon"></div>
</button>

<style>
    .icon {
        height: 2px;
        width: 20px;
        top: 13px;
        background-color: var(--color-gray-500);
        border-radius: 20px;
        position: absolute;
        transition-duration: 0.3s;
        z-index: 100;
    }
    .icon:before {
        left: 0;
        position: absolute;
        top: -7px;
        height: 2px;
        width: 20px;
        background-color: var(--color-gray-500);
        content: "";
        border-radius: 20px;
        transition-duration: 0.3s;
        z-index: 100;
    }
    .icon:after {
        left: 0;
        position: absolute;
        top: 7px;
        height: 2px;
        width: 20px;
        background-color: var(--color-gray-500);
        content: "";
        border-radius: 20px;
        transition-duration: 0.3s;
        z-index: 100;
    }

    .menu {
        width: 32px;
        height: 32px;
        position: relative;
        transition-duration: 1s;
        display: flex;
        justify-content: center;
        cursor: pointer;
        justify-self: flex-end;
        z-index: 100;
        border: 2px solid var(--color-gray-500);
        border-radius: var(--radius-full);
        background: var(--color-bg);
    }

    .burger .icon {
        transition-duration: 0.3s;
        transition-delay: 0.3s;
    }
    .burger .icon:after {
        transition:
            transform 0.3s,
            top 0.3s 0.3s;
    }
    .burger .icon:before {
        transition:
            transform 0.3s,
            top 0.3s 0.3s;
    }

    .burger.open .icon {
        transition-duration: 0.1s;
        transition-delay: 0.3s;
        background: transparent;
    }

    .burger.open .icon:before {
        transition:
            top 0.3s,
            transform 0.3s 0.3s;
        top: 0px;
        transform: rotateZ(-45deg);
    }

    .burger.open .icon:after {
        transition:
            top 0.3s,
            transform 0.3s 0.3s;
        top: 0px;
        transform: rotateZ(45deg);
    }
</style>
