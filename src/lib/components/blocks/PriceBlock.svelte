<script>
    import { onMount, onDestroy } from "svelte";
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import { formatPrice } from "$lib/utils/priceFormatter.js";
    import MyButton from "../UI/buttons/MyButton.svelte";
    import getOldPrice from "$lib/utils/getOldPrice";

    export let price = 0;
    export let priceType = ""; // 'per_day', 'per_hour', ...
    export let lang = "en";
    export let discount = 0; // Discount percentage, e.g., 10 for 10%

    console.log(price, priceType, lang, discount);

    export let discountEnd = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]; // Optional end date for the discount

    console.log(price, discount, discountEnd);
    const priceStore = formatPrice(price);
    const oldPriceStore = formatPrice(getOldPrice(price, discount));
    $: isDiscountActive =
        discount > 0 && Object.values(remaining).some((val) => +val > 0);

    let remaining = {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    };
    let intervalId;

    const keyMap = {
        days: "day",
        hours: "hour",
        minutes: "minute",
        seconds: "second",
    };

    // Локализованные единицы времени
    const timeUnits = {
        en: { day: "d", hour: "h", minute: "m", second: "s" },
        ru: { day: "д", hour: "ч", minute: "м", second: "с" },
        tr: { day: "g", hour: "s", minute: "d", second: "s" },
    };

    function updateRemaining() {
        const end = new Date(discountEnd + "T23:59:59").getTime();

        const now = new Date().getTime();
        let diff = end - now;

        if (diff <= 0) {
            clearInterval(intervalId);
            diff = 0;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        remaining = {
            days: String(days).padStart(2, "0"),
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
        };
    }

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

    export const discountEndLabels = {
        ru: "cрок действия скидки",
        en: "discount ends",
        tr: "indirim süresi",
    };

    function getPriceTypeLabel(type, lang) {
        return priceTypeLabels[type]?.[lang] || priceTypeLabels[type]?.en || "";
    }

    onMount(() => {
        updateRemaining();
        if (discountEnd) intervalId = setInterval(updateRemaining, 1000);
    });

    onDestroy(() => {
        if (intervalId) clearInterval(intervalId);
    });
</script>

<aside class="booking-card">
    <div class="price-block">
        <div class="price-row">
            {#if isDiscountActive}
                <span class="discount">-{discount}%</span>
                <span class="old-price">{oldPriceStore}</span>
            {/if}

            <span class="price">{priceStore}</span>
        </div>

        {#if priceType}
            <span class="per-person">{getPriceTypeLabel(priceType, lang)}</span>
        {/if}

        {#if isDiscountActive}
            <div class="discount-timer">
                {#each Object.entries(remaining) as [key, value]}
                    <div class="time-block">
                        <div class="number">{value}</div>
                        <div class="label">
                            {timeUnits[lang][keyMap[key]]}
                        </div>
                    </div>
                {/each}
            </div>
            <span class="discountEndLabel">{discountEndLabels[lang]}</span>
        {/if}
    </div>
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

    .price-block {
        display: flex;
        flex-direction: column;
        text-align: center;
        gap: var(--space-vertical-xs);
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
        text-decoration-line: line-through;
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

    .discount-timer {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
    }

    .time-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--color-gray-200);
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-sm);
        min-width: 3rem;
    }

    .number {
        font-size: var(--text-lg);
        font-weight: 700;
    }

    .label {
        font-size: var(--text-xs);
        color: var(--color-gray-600);
    }

    .discountEndLabel {
        display: block;
        color: var(--color-gray-600);
    }

    /* Тёмная тема только для таймера */
    @media (prefers-color-scheme: dark) {
        .time-block {
            background: #2a2d31; /* тёмный фон таймера */
        }
        .label {
            color: #c4c4c4; /* светлый текст */
        }
        .discount {
            background-color: #f66e6e; /* скидка лучше контрастировать */
        }
    }
</style>
