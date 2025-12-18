// src/lib/config/card/badgeRules.config.js
import { isDiscountActive } from "$lib/features/priceBlock/priceBlock.utils.js";
export const badgeRules = {
    DISCOUNT: {
        position: "bottomleft",
        condition: (item) => isDiscountActive(item.discount, item.discountEnd),
        label: {
            en: "Discount",
            ru: "Скидка",
        },
        format: ({ discount }) => `-${discount}%`,
    },

    NEW: {
        position: "topleft",
        condition: ({ createdAt }) => {
            if (!createdAt) return false;
            const now = Date.now();
            const created = new Date(createdAt).getTime();
            return now - created < 30 * 24 * 60 * 60 * 1000; // 30 дней
        },
        label: {
            en: "New",
            ru: "Новинка",
        },
    },

    POPULAR: {
        position: "topright",
        condition: ({ rating, reviewsCount }) =>
            rating >= 4.5 && reviewsCount >= 10,
        label: {
            en: "Popular",
            ru: "Популярный",
        },
    },

    VIP: {
        position: "bottomright",
        condition: ({ price }) => price > 900,
        label: {
            en: "VIP",
            ru: "VIP",
        },
    },
};
