<script>
    import TheButton from "$lib/components/UI/buttons/TheButton.svelte";
    import { main_page } from "$lib/data/main_page.js";
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";
    import TheSidebar from "$lib/components/layout/TheSidebar.svelte";

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });
</script>

{#if isMounted}
    <div class="content">
        <TheSidebar />
        <main>
            <div class="main_page">
                <h1>
                    <strong>{main_page.title[$locale]}</strong>
                    {#if main_page.subtitle && main_page.subtitle[$locale]}
                        <p>{main_page.subtitle[$locale]}</p>
                    {/if}
                </h1>
                <section>
                    <div>{@html main_page.main_text[$locale]}</div>
                    <a href={`/${$locale}${main_page.link}`} aria-label="link">
                        {main_page.link_text[$locale]}
                    </a>
                </section>
                <section>
                    <h2 class="section_title">
                        {main_page.games_title[$locale]}
                    </h2>
                    <!-- <a href={`/${$locale}${main_page.games_link}`} aria-label="games"
                ><div class="img_wrap"></div></a
            > -->
                    <a
                        href={`/${$locale}${main_page.games_link}`}
                        aria-label="link"
                    >
                        {main_page.link_text[$locale]}
                    </a>
                </section>
            </div>
        </main>
    </div>
{:else}
    <div></div>
{/if}

<style>
    .content {
        display: grid;
        grid-template-columns: 25% 1fr;
        align-items: flex-start;
        padding: 0px;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-top: 1px solid var(--color-gray-500);
    }

    .main_page {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }

    h1 strong {
        color: var(--foreground);
    }

    section {
        width: 100%;
        transition: all 0.4s ease-in;
    }
    .section_title {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1rem auto;
    }

    @media (max-width: 768px) {
        .content {
            grid-template-columns: 1fr;
        }
        .main_page {
            gap: 2rem;
        }
    }
    @media (max-width: 480px) {
        .main_page {
            gap: 0.5rem;
        }
    }
</style>
