<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { footer_list } from "$lib/data/footer_list";
    import { page } from "$app/stores";

    let isMounted = false;
    $: currentPath = $page.url.pathname;

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <footer>
        <a
            class="menu-item {currentPath === `/${$locale}` ? 'active' : ''}"
            href="/"
            rel={footer_list[0].rel}
            target={footer_list[0].target}
        >
            <div class="icon-wrapper">
                <svelte:component this={footer_list[0].icon} />
            </div>
            <span>{footer_list[0].title[$locale]}</span>
        </a>
        <div
            class="menu-item {currentPath !== `/${$locale}` ? 'disabled' : ''}"
        >
            <div class="icon-wrapper">
                <svelte:component this={footer_list[1].icon} />
            </div>
            <span>{footer_list[1].title[$locale]}</span>
        </div>
        <a
            class="menu-item {currentPath ===
            `/${$locale}/${footer_list[2].link}`
                ? 'active'
                : ''}"
            href={`/${$locale}/${footer_list[2].link}`}
            rel={footer_list[2].rel}
            target={footer_list[2].target}
        >
            <div class="icon-wrapper">
                <svelte:component this={footer_list[2].icon} />
            </div>
            <span>{footer_list[2].title[$locale]}</span>
        </a>
        <div class="menu-item">
            <div class="icon-wrapper">
                <svelte:component this={footer_list[3].icon} />
            </div>
            <span>{footer_list[3].title[$locale]}</span>
        </div>
    </footer>
{:else}
    <div></div>
{/if}

<style>
    footer {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(72px, 1fr));
        grid-template-rows: 1fr;
        align-items: center;
        justify-content: center;
        gap: var(--space-horizontal-md);
        height: 100%;
    }
    .menu-item {
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-sm);
        cursor: pointer;
        height: 100%;
    }

    .icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        width: 24px;
    }

    .menu-item:hover {
        color: var(--color-primary-hover);
    }
    .menu-item.active {
        color: var(--color-primary);
    }

    .menu-item.active .icon-wrapper {
        color: var(--color-primary);
    }

    .menu-item.disabled {
        opacity: 0.5;
        pointer-events: none;
        cursor: default;
    }

    @media (max-width: 768px) {
        footer {
            gap: 0;
        }
        .menu-item {
            flex-direction: column;
            gap: 0;
        }
        .menu-item span {
            font-size: var(--text-xs);
        }
    }
</style>
