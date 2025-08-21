<script>
    import Share from "$lib/components/UI/buttons/Share.svelte";
    import { formatPrice } from "$lib/utils/priceFormatter.js";
    import MyButton from "../UI/buttons/MyButton.svelte";
    import getOldPrice from "$lib/utils/getOldPrice";

    export let price = 0;
    export let active = false;
    export let locale = "en";
    export let discount = 0; // Discount percentage, e.g., 10 for 10%
    export let type = "default"; // 'car', 'yacht', 'excursion', 'transfer'
    console.log(type, "type in ButtonBlock");

    export let onBook = () => {};

    console.log(active, "active in ButtonBlock");

    const priceStore = formatPrice(price);
    const oldPriceStore = formatPrice(getOldPrice(price, discount)); // Assuming 10% discount for example

    // Переводы надписей на кнопке по типу товара
    const bookingLabels = {
        en: {
            default: "Join now",
            excursion: "Order now",
            yacht: "All aboard",
            car: "Pick up?",
            transfer: "Let’s go!",
            unavailable: "Unavailable",
        },
        ru: {
            default: "Записаться",
            excursion: "Заказать сейчас",
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

<MyButton
    id="book-button"
    onclick={active ? onBook : null}
    disabled={!active}
    size="md"
    variant="secondary">{getBookingLabel(locale, type, active)}</MyButton
>

<style>
</style>
