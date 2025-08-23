<script>
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import { formatPrice } from "$lib/utils/priceFormatter.js";
    import MyButton from "../UI/buttons/MyButton.svelte";
    import getOldPrice from "$lib/utils/getOldPrice";

    export let price = 0;
    export let priceType = ""; // 'per_day', 'per_hour', ...
    export let active = false;
    export let locale = "en";
    export let discount = 0; // Discount percentage, e.g., 10 for 10%
    export let type = "default"; // 'car', 'yacht', 'excursion', 'transfer'
    export let onBook = () => {};

    const priceStore = formatPrice(price);
    const oldPriceStore = formatPrice(getOldPrice(price, discount)); // Assuming 10% discount for example

    // Переводы надписей на кнопке по типу товара
    const bookingLabels = {
        en: {
            default: "Join now",
            excursion: "Order",
            yacht: "All aboard",
            car: "Pick up?",
            transfer: "Let’s go!",
            unavailable: "Unavailable",
        },
        ru: {
            default: "Записаться",
            excursion: "Заказать",
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
        <div class="price-row">
            {#if discount > 0}
                <span class="discount">-{discount}%</span>
                <span class="old-price">{$oldPriceStore}</span>
            {/if}

            <span class="price">{$priceStore}</span>
        </div>

        {#if priceType}
            <span class="per-person"
                >{getPriceTypeLabel(priceType, locale)}</span
            >
        {/if}
    </div>

    <MyButton
        id="book-button"
        onclick={active ? onBook : null}
        disabled={!active}
        size="md"
        variant="secondary">{getBookingLabel(locale, type, active)}</MyButton
    >

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

        border-radius: var(--radius-md);
        align-self: start;
        top: var(--space-vertical-md);
    }

    @media (max-width: 480px) {
        .booking-card {
            padding: 0 var(--space-horizontal-sm);
        }
    }
    @media (max-width: 768px) {
        .booking-card {
            position: static;
        }
    }

    .price-block {
        text-align: center;
    }
    .price-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-horizontal-xs);
    }

    .price-block .price {
        font-size: var(--text-xxl);
        font-weight: 700;
        color: var(--color-error);
    }

    .price-block .old-price {
        font-size: var(--text-xxl);
        font-weight: 700;
        color: var(--color-text);
        text-decoration-line: line-through; /* подчёркивание */
        text-decoration-color: var(--color-error);
    }
    .price-block .discount {
        border-radius: var(--radius-sm);
        padding: 0 var(--space-horizontal-xs);
        font-size: var(--text-sm);
        color: var(--color-bg);
        background-color: var(--color-error);
        font-weight: 500;
    }

    .price-block .per-person {
        font-size: var(--text-sm);
        color: var(--color-gray-600);
    }
</style>
