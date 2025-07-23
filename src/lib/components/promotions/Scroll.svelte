<script>
    import { locale } from "$lib/stores/locale";
    export const line = Array(6).fill({
        ru: "Акция: подписка в instagram + репост = -5% на любой тур!",
        en: "Promo: subscribe to Instagram + repost = -5% on any tour!",
    });
</script>

<div class="scroll">
    <div class="scroll-track">
        {#each line as item, i (i)}
            <a
                href="https://www.instagram.com/kemer.app"
                rel="noopener noreferrer nofollow"
                target="_blank"
                class="itemHighlight">{item[$locale]}</a
            >
        {/each}
        {#each line as item, i (i)}
            <a
                href="https://www.instagram.com/kemer.app"
                rel="noopener noreferrer nofollow"
                target="_blank"
                class="itemHighlight">{item[$locale]}</a
            >
        {/each}
    </div>
</div>

<style>
    .scroll {
        position: relative;

        width: 100%;
        height: auto;
        background-color: var(--color-bg);
        padding: var(--space-horizontal-xs) 0;
    }

    .scroll-track {
        display: inline-flex;
        white-space: nowrap;
        animation: scroll 40s linear infinite;
        will-change: transform;
    }

    .scroll-track:hover {
        animation-play-state: paused;
    }

    .scroll-track a {
        display: inline-flex;
        padding: 5px 10px;
        border-radius: 5px;
        text-transform: uppercase;
        white-space: nowrap;
        margin-right: 20px;
        font-weight: 600;
        flex-shrink: 0;
    }

    .itemHighlight {
        color: var(--color-error);
        font-weight: 700;
        text-shadow: 0 0 4px rgba(208, 48, 47, 0.6);
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-50%);
        }
    }
</style>
