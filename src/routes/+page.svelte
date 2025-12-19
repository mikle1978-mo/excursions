<!-- src\routes\+page.svelte -->
<script>
    import { appConfig } from "$lib/config/app.config.js";

    const lang = "en";
    const entryConfig = appConfig.pages.entry;

    const { h1, subtitle, content, languages } = entryConfig;
</script>

<svelte:head>
    <title>{entryConfig.seo.title[lang]}</title>
    <meta name="description" content={entryConfig.seo.description[lang]} />
</svelte:head>

<section class="entry">
    <!-- HERO -->
    <header class="hero">
        <h1>{h1[lang]}</h1>
        <p class="subtitle">{subtitle[lang]}</p>
    </header>

    <!-- CONTENT -->
    <main class="content">
        {#each content[lang] as block}
            {#if block.type === "text"}
                <p class="text">{block.value}</p>
            {:else if block.type === "h2"}
                <h2>{block.value}</h2>
            {:else if block.type === "list"}
                <ul>
                    {#each block.value as item}
                        <li>{item}</li>
                    {/each}
                </ul>
            {/if}
        {/each}
        <div class="language-buttons">
            {#each languages as button}
                <a href={button.href} class="lang-btn">
                    {button.label}
                </a>
            {/each}
        </div>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
        <p>
            © {new Date().getFullYear()} Kemer.app · Based in Kemer, Turkey · Licensed
            No. 3834
        </p>
    </footer>
</section>

<style>
    .entry {
        min-height: 100vh;
        background: var(--color-bg);
        color: var(--color-text);
        padding: var(--space-vertical-md) var(--space-horizontal-xs);
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    /* ===== HERO ===== */
    .hero {
        max-width: var(--max-width-container);
        margin: 0 auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }

    h1 {
        font-size: var(--text-xl);
        line-height: 1.15;
        max-width: 22ch;
        margin: 0 auto;
    }

    .subtitle {
        font-size: var(--text-md);
        max-width: var(--max-width-text);
        margin: 0 auto;
        opacity: 0.85;
    }

    .language-buttons {
        display: flex;
        justify-content: center;
        gap: var(--space-horizontal-sm);
        flex-wrap: wrap;
    }

    .lang-btn {
        padding: var(--space-vertical-xs) var(--space-horizontal-lg);
        border-radius: var(--radius-full);
        background: var(--color-primary);
        color: #fff;
        text-decoration: none;
        font-size: var(--text-md);
        transition:
            background var(--transition-normal),
            transform var(--transition-fast);
    }

    .lang-btn:hover {
        background: var(--color-primary-hover);
        transform: translateY(-1px);
    }

    /* ===== CONTENT ===== */
    .content {
        max-width: var(--max-width-text);
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    h2 {
        font-size: var(--text-lg);
    }

    .text {
        font-size: var(--text-md);
        line-height: var(--line-height-base);
        opacity: 0.9;
    }

    ul {
        padding-left: 1.2em;
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }

    li {
        font-size: var(--text-md);
        line-height: var(--line-height-base);
    }

    /* ===== FOOTER ===== */
    .footer {
        margin-top: auto;
        text-align: center;
        font-size: var(--text-sm);
        opacity: 0.6;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
        h1 {
            font-size: var(--text-lg);
        }

        .subtitle {
            font-size: var(--text-sm);
        }
    }
</style>
