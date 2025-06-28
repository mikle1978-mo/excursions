<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import { footer_list } from "$lib/i18n/footer_list";
    import { page } from "$app/stores";
    import { sidebarOpen } from "$lib/stores/sidebar";
    import { mobileMenuOpen } from "$lib/stores/mobileMenu";

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <footer>
        <a
            class="menu-item {$page.url.pathname === `/${$locale}`
                ? 'active'
                : ''}"
            href="/"
            rel={footer_list[0].rel}
            target={footer_list[0].target}
        >
            <div class="icon-wrapper">
                <svg
                    class="icon"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.46268 9.62686L12.4627 2.62686L21.4627 9.62686V20.6269C21.4627 21.1573 21.252 21.666 20.8769 22.0411C20.5018 22.4161 19.9931 22.6269 19.4627 22.6269H15.5V13H9.5V22.6269H5.46268C4.93224 22.6269 4.42354 22.4161 4.04846 22.0411C3.67339 21.666 3.46268 21.1573 3.46268 20.6269V9.62686Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill="none"
                    />
                </svg>
            </div>
            <span>{footer_list[0].title[$locale]}</span>
        </a>
        {#if $page.url.pathname.includes("excursions")}
            <button class="menu-item" on:click={() => sidebarOpen.set(true)}>
                <div class="icon-wrapper">
                    <svelte:component this={footer_list[1].icon} />
                </div>
                <span>{footer_list[1].title[$locale]}</span>
            </button>
        {/if}

        <a
            class="menu-item {$page.url.pathname ===
            `/${$locale}/${footer_list[2].link}`
                ? 'active'
                : ''}"
            href={`/${$locale}/${footer_list[2].link}`}
            rel={footer_list[2].rel}
            target={footer_list[2].target}
        >
            <div class="icon-wrapper">
                <svg
                    class="icon_faq"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.4634 22C17.9863 22 22.4634 17.5228 22.4634 12C22.4634 6.47715 17.9863 2 12.4634 2C6.94057 2 2.46342 6.47715 2.46342 12C2.46342 17.5228 6.94057 22 12.4634 22Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill="none"
                    />
                    <path
                        d="M9.55342 9.00002C9.78852 8.33169 10.2526 7.76813 10.8634 7.40915C11.4742 7.05018 12.1923 6.91896 12.8906 7.03873C13.5889 7.15851 14.2222 7.52154 14.6785 8.06355C15.1348 8.60555 15.3845 9.29154 15.3834 10C15.3834 12 12.3834 13 12.3834 13"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12.4634 17H12.4734"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <span>{footer_list[2].title[$locale]}</span>
        </a>

        <button class="menu-item" on:click={() => mobileMenuOpen.set(true)}>
            <div class="icon-wrapper">
                <svg
                    class="icon"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.4634 3H3.46342V10H10.4634V3Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M21.4634 3H14.4634V10H21.4634V3Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M21.4634 14H14.4634V21H21.4634V14Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M10.4634 14H3.46342V21H10.4634V14Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </div>
            <span>{footer_list[3].title[$locale]}</span>
        </button>
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
        justify-content: center;
        gap: var(--space-horizontal-sm);
        background-color: inherit;
        color: var(--color-text);
        cursor: pointer;
        height: 100%;
        border: none;
        font-size: var(--text-md);
    }

    .icon-wrapper {
        display: flex;
        align-items: center;

        justify-content: center;
        height: calc(var(--space-vertical-md) * 1.3);
        width: calc(var(--space-vertical-md) * 1.3);
    }

    .menu-item:hover .icon path {
        fill: currentColor;
    }
    .menu-item:hover span {
        font-weight: bolder;
    }

    .menu-item.active .icon path {
        fill: currentColor;
    }
    .menu-item.active .icon_faq path {
        stroke-width: 3;
    }
    .menu-item.active span {
        font-weight: bolder;
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
