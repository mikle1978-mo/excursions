<script>
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import { formatPrice } from "$lib/utils/priceFormatter.js";

    export let price = 0;
    export let priceType = ""; // 'per_day', 'per_hour', ...
    export let active = false;
    export let locale = "en";
    export let type = "default"; // 'car', 'yacht', 'excursion', 'transfer'
    export let onBook = () => {};

    const priceStore = formatPrice(price);

    // Переводы надписей на кнопке по типу товара
    const bookingLabels = {
        en: {
            default: "Join now",
            excursion: "I want this!",
            yacht: "All aboard",
            car: "Pick up?",
            transfer: "Let’s go!",
            unavailable: "Unavailable",
        },
        ru: {
            default: "Записаться",
            excursion: "Хочу!",
            yacht: "На борт!",
            car: "Забрать?",
            transfer: "Поехали!",
            unavailable: "Недоступно",
        },
        tr: {
            default: "Katılmak istiyorum",
            excursion: " İstiyorum!",
            yacht: "Gemiye çık!",
            car: "Alayım mı?",
            transfer: "Hadi gidelim!",
            unavailable: "Müsait değil",
        },
    };

    const priceTypeLabels = {
        per_day: { en: "per day", ru: "в день", tr: "günlük" },
        per_hour: { en: "per hour", ru: "в час", tr: "saatlik" },
        per_week: { en: "per week", ru: "в неделю", tr: "haftalık" },
        per_person: { en: "per person", ru: "с человека", tr: "kişi başı" },
        per_trip: { en: "per trip", ru: "за поездку", tr: "gezi başı" },
    };

    function getPriceTypeLabel(type, locale) {
        return (
            priceTypeLabels[type]?.[locale] || priceTypeLabels[type]?.en || ""
        );
    }

    function getBookingLabel(locale, type, isActive) {
        const dict = bookingLabels[locale] || bookingLabels.en;
        if (!isActive) return dict.unavailable || "Unavailable";
        return dict[type] || dict.default || "Book";
    }
</script>

<aside class="booking-card">
    <div class="price-block">
        <span class="price">{$priceStore}</span>
        {#if priceType}
            <span class="per-person"
                >{getPriceTypeLabel(priceType, locale)}</span
            >
        {/if}
    </div>

    <button
        class="book-button"
        on:click={active ? onBook : null}
        disabled={!active}
        style="
            background-color: {active ? 'var(--color-primary)' : '#ccc'};
            cursor: {active ? 'pointer' : 'not-allowed'};
        "
    >
        {getBookingLabel(locale, type, active)}
    </button>

    <Share />
</aside>

<style>
    .booking-card {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-vertical-md);
        background: var(--color-bg);
        padding: var(--space-vertical-md);
        border-radius: var(--radius-md);
        align-self: start;
        top: var(--space-vertical-md);
    }

    @media (max-width: 768px) {
        .booking-card {
            position: static;
        }
    }

    .price-block {
        text-align: center;
    }

    .price-block .price {
        font-size: var(--text-xxl);
        font-weight: 700;
        color: var(--color-primary);
        display: block;
    }

    .price-block .per-person {
        font-size: var(--text-sm);
        color: var(--color-gray-600);
    }

    /* .details {
        display: grid;
        width: 100%;
        gap: var(--space-vertical-sm);
    } */

    .book-button {
        width: 100%;
        padding: var(--space-vertical-sm);
        background: var(--color-primary);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);
    }

    .book-button:hover {
        background: var(--color-primary-hover);
    }
</style>
