<script>
    import { locale, setLocale } from "$lib/stores/locale.js";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import TheLogo from "./TheLogo.svelte";
    import Search from "$lib/components/UI/inputs/search/Search.svelte";

    let isMounted = false;

    function updateURL(newLang) {
        if (typeof window === "undefined") return;

        const currentPath = window.location.pathname;
        const match = currentPath.match(/^\/(ru|en)(\/|$)/);
        const newPath = match
            ? currentPath.replace(/^\/(ru|en)/, `/${newLang}`)
            : `/${newLang}${currentPath}`;

        if (currentPath !== newPath) {
            goto(newPath, { replaceState: true });
        }
    }

    onMount(() => {
        isMounted = true;

        if (typeof window !== "undefined") {
            const storedLang =
                localStorage.getItem("locale") ||
                (navigator.language.startsWith("ru") ? "ru" : "en");
            locale.set(storedLang);
            updateURL(storedLang);
        }
    });

    $: {
        if (isMounted) updateURL($locale);
    }
</script>

<!-- <header class:isHidden={$isHidden}> -->
<header class="header">
    <div class="header_row">
        <TheLogo />
        <div class="line_right">
            {#if isMounted}
                <Search />
            {:else}
                <p></p>
            {/if}

            <button
                onclick={() => {
                    const newLang = $locale === "ru" ? "en" : "ru";
                    setLocale(newLang);
                    goto(`/${newLang}`, { replaceState: true });
                }}
                class="locale-btn"
                aria-label="Switch language"
                ><svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="locale-icon"
                >
                    <path
                        d="M12.6087 22.8696C18.1316 22.8696 22.6087 18.3924 22.6087 12.8696C22.6087 7.34672 18.1316 2.86956 12.6087 2.86956C7.08586 2.86956 2.6087 7.34672 2.6087 12.8696C2.6087 18.3924 7.08586 22.8696 12.6087 22.8696Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M2.6087 12.8696H22.6087"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M12.6087 2.86956C15.11 5.60792 16.5315 9.1616 16.6087 12.8696C16.5315 16.5775 15.11 20.1312 12.6087 22.8696C10.1074 20.1312 8.68595 16.5775 8.6087 12.8696C8.68595 9.1616 10.1074 5.60792 12.6087 2.86956Z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </button>
        </div>
    </div>
</header>

<style>
    /* header.isHidden {
		transform: translateY(-100%);
	} */

    .header {
        height: 100%;
    }
    .header_row {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .line_right {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 1rem;
        height: 100%;
    }

    .locale-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: inherit;
        border: none;
        border-radius: 50%;
        width: auto;
        height: 80%;
        line-height: 1;
        cursor: pointer;
        border-color: inherit;
        transition: background-color 0.3s ease;
        color: var(--color-text);
        background: none;
    }
    .locale-icon {
        width: 100%;
        height: 100%;
        stroke: currentColor;
    }
    .locale-btn:hover {
        color: var(--primary-light);
    }

    @media (max-width: 480px) {
        .line_right {
            gap: 0.5rem;
        }
        .locale-btn {
            width: 1.8rem;
            height: 1.8rem;
        }
    }
</style>
