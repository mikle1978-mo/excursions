// src/lib/features/priceBlock/priceBlock.utils.js

export function buildDiscountTimer(discountEnd) {
    const end = new Date(discountEnd + "T23:59:59").getTime();
    const now = Date.now();
    let diff = Math.max(end - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
    };
}

export function isDiscountActive(discount, discountEnd) {
    if (!discount || !discountEnd) return false;
    const end = new Date(discountEnd + "T23:59:59").getTime();
    return Date.now() < end;
}
