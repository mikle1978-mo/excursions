<script>
    import { locale } from "$lib/stores/locale";
    import { get } from "svelte/store";
    const translate = {
        ru: "Поделиться",
        en: "Share",
    };
    const alerts = {
        copied: {
            ru: "Ссылка скопирована в буфер обмена",
            en: "Link copied to clipboard",
        },
        error: {
            ru: "Не удалось скопировать ссылку",
            en: "Failed to copy link",
        },
        share: {
            ru: "Поделиться",
            en: "Share",
        },
    };

    const handleShare = async () => {
        const currentLocale = get(locale);
        const url = window.location.href;
        const title = document.title;

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url,
                });
            } catch (err) {
                console.error(`"Ошибка при попытке поделиться:"`, err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert(`${alerts.copied[currentLocale]}`);
            } catch (err) {
                alert(`${alerts.error[currentLocale]}`);
            }
        }
    };
</script>

<button
    id="share-button"
    on:click={handleShare}
    aria-label="share"
    class="share-button"
    title={alerts.share[$locale] || alerts.share.en}
>
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M16 6L12 2L8 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M12 2V15"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </svg>
    <span>{translate[$locale]}</span>
</button>

<style>
    .share-button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: var(--space-horizontal-xs);
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        border-radius: var(--radius-full);
        font-size: var(--text-xs);
        font-weight: 600;
        background: transparent;
        border: 1px solid var(--color-text);
        cursor: pointer;
        color: var(--color-text);
    }
    .share-button svg {
        width: var(--text-lg);
        height: var(--text-lg);
        font-size: var(--text-md);
        transition: color 0.3s ease;
        color: var(--color-text);
    }

    .share-button:hover {
        color: var(--color-primary);
    }
</style>
