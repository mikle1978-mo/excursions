/**
 * Вычисляет старую цену до скидки
 * @param {number} currentPrice - Цена со скидкой
 * @param {number} discount - Скидка в процентах (например, 20 = 20%)
 * @returns {number} Старая цена, округлённая до целого
 */
export default function getOldPrice(currentPrice, discount) {
    if (!currentPrice || !discount) return currentPrice;
    return Math.round(currentPrice / (1 - discount / 100));
}
