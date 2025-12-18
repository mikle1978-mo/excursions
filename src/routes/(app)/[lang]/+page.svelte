<!-- src\routes\(app)\[lang]\+page.svelte -->
<script>
    import { appConfig } from "$lib/config/app.config.js";
    import MainCard from "$lib/components/cards/MainCard.svelte";
    import SeoRenderer from "$lib/components/SEO/SeoRenderer.svelte";
    import TheHeader from "$lib/components/layout/TheHeader.svelte";

    import { page } from "$app/stores";
    import { fly, slide } from "svelte/transition";
    export let data;

    const { lang } = data ?? {};

    const homeConfig = appConfig.pages.home;
    const type = "home";
</script>

<!-- SEO для страницы -->
<SeoRenderer {type} {lang} />

<svelte:head>
    <!-- // Google AdSense -->
    <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5449189100205390"
        crossorigin="anonymous"
    ></script>
</svelte:head>
<TheHeader />
<div class="content">
    <main>
        <div class="main_page">
            <h1>
                {homeConfig.h1[lang]}
            </h1>

            <div class="grid">
                {#each homeConfig.pages as item, i}
                    <MainCard {item} loading={"eager"} {lang} />
                {/each}
            </div>
        </div>
    </main>
</div>

<style>
    .content {
        position: relative;
        display: flex;
        align-items: flex-start;
        padding: 0px;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-top: 1px solid var(--color-gray-500);
        border-bottom: 1px solid var(--color-gray-500);
    }

    .main_page {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
        width: 100%;
        padding: var(--space-vertical-md) 0;
    }

    h1 {
        text-align: center;
        font-size: var(--text-xl);
    }

    .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-vertical-md);
        width: 100%;
        align-items: center;
    }

    /* 414+ — 1 колонка (карточка красиво помещается) */
    @media (min-width: 414px) {
        .grid {
            grid-template-columns: 1fr;
        }
    }

    /* 576+ — 2 колонки */
    @media (min-width: 576px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* 768+ — 2 колонки (можешь оставить 2, если не хочешь мельчить) */
    @media (min-width: 768px) {
        .grid {
            grid-template-columns: 1fr 1fr;
        }
    }

    /* 992+ — 3 колонки */
    @media (min-width: 992px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    /* 1200+ — 4 колонки */
    @media (min-width: 1200px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }

    /* 1440+ — 5 колонок (или оставь 4, если плотность не нравится) */
    @media (min-width: 1440px) {
        .grid {
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
    }
</style>
