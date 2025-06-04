<script>
    export let data;
</script>

<svelte:head>
    <title>Часто задаваемые вопросы | FAQ</title>
</svelte:head>

<main class="faq-page">
    <h1 class="faq-title">
        Часто задаваемые <span class="highlight">вопросы</span>
    </h1>

    <div class="faq-list">
        {#each data.faqs as { question, answer }}
            <details class="faq-item">
                <summary class="faq-question">
                    {question}
                    <span class="faq-toggle">+</span>
                </summary>
                <p class="faq-answer">{answer}</p>
            </details>
        {/each}
    </div>
</main>

<style>
    .faq-page {
        display: grid;
        grid-template-columns: 1fr;
        align-items: flex-start;
        padding: var(--space-vertical-md) 0;
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

    .faq-title {
        font-size: var(--text-xl);
        text-align: center;
        margin-bottom: var(--space-vertical-md);
        font-weight: 700;
    }

    .faq-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    .faq-item {
        background: var(--color-gray-100);
        color: var(--color-text);
        padding: var(--space-vertical-sm) var(--space-horizontal-md);
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-sm);
        cursor: pointer;
        transition: background var(--transition-normal);
    }

    .faq-item[open] {
        background: var(--color-primary);
        color: var(--color-light);
        box-shadow: var(--shadow-md);
    }

    .faq-question {
        font-size: var(--text-md);
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        user-select: none;
    }

    .faq-toggle {
        font-weight: 700;
        font-size: 1.5em;
        transition: transform var(--transition-normal);
    }

    details[open] .faq-toggle {
        transform: rotate(45deg);
    }

    .faq-answer {
        margin-top: var(--space-vertical-xs);
        font-size: var(--text-sm);
        line-height: var(--line-height-base);
    }

    @media (prefers-color-scheme: dark) {
        .faq-item {
            background: var(--color-gray-800);
            color: var(--color-light);
        }

        .faq-item[open] {
            background: var(--color-primary-hover);
        }
    }
</style>
