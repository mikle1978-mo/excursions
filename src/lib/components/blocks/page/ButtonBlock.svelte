<script>
    import { formatPrice } from "$lib/utils/priceFormatter.js";
    import MyButton from "$lib/components/UI/buttons/MyButton.svelte";
    import getOldPrice from "$lib/utils/getOldPrice";
    import { appConfig } from "$lib/config/app.config";

    export let data;
    export let system;
    export let onAction = null;
    const active = data.active || false;
    const lang = system.lang || "en";
    const type = system.type || "excursions";
    const config = appConfig?.blocks?.button;

    // Лейблы полностью из конфига
    const labels = appConfig?.blocks?.button?.labels || {};

    function getBookingLabel(lang, type, isActive) {
        const dict = labels[lang] || labels.en || {};
        if (!isActive) return dict.unavailable || "Unavailable";
        return dict[type] || dict.default || "Book";
    }
</script>

<div class="button-block">
    <MyButton
        id="book-button"
        onclick={active && onAction ? onAction : null}
        disabled={!active}
        size="md"
        variant="secondary">{getBookingLabel(lang, type, active)}</MyButton
    >
</div>

<style>
    .button-block {
        position: sticky;
        width: 100%;
        bottom: 0;
        z-index: 10;
        backdrop-filter: blur(10px);
        background-color: rgba(var(--color-bg-rgb), 0.5);
        padding: var(--space-vertical-sm) var(--space-horizontal-sm);
    }

    @media (max-width: 480px) {
        .button-block {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        }
    }
</style>
