<script>
    import { formatPrice } from "$lib/utils/priceFormatter.js";
    import MyButton from "../UI/buttons/MyButton.svelte";
    import getOldPrice from "$lib/utils/getOldPrice";
    import { appConfig } from "$lib/config/app.config";

    export let props;
    const data = Object.fromEntries(props.fields.map((f) => [f.key, f.value]));
    const active = data.active || false;
    const lang = data.lang || "en";
    const type = data.type || "excursions";
    const config = appConfig?.blocks?.button;

    export let onBook = () => {};

    // Лейблы полностью из конфига
    const labels = appConfig?.blocks?.button?.labels || {};

    console.log("123456", labels);

    function getBookingLabel(lang, type, isActive) {
        const dict = labels[lang] || labels.en || {};
        if (!isActive) return dict.unavailable || "Unavailable";
        return dict[type] || dict.default || "Book";
    }
</script>

<div class="button-block">
    <MyButton
        id="book-button"
        onclick={active ? onBook : null}
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
            padding: 0 var(--space-vertical-sm);
        }
    }
</style>
