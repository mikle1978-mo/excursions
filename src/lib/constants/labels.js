export const CARD_LABELS = {
    DISCOUNT: {
        condition: (item) => item.discount > 0,
        label: {
            en: "Discount",
            ru: "Скидка",
        },
    },
    NEW: {
        condition: (item) => {
            const now = new Date();
            const created = new Date(item.createdAt);
            return now - created < 30 * 24 * 60 * 60 * 1000; // 30 дней
        },
        label: {
            en: "New",
            ru: "Новинка",
        },
    },
    POPULAR: {
        condition: (item) => item.rating >= 4.5 && item.reviewsCount >= 10,
        label: { en: "Popular", ru: "Популярный" },
    },
    VIP: {
        condition: (item) => item.price > 900,
        label: { en: "VIP", ru: "VIP" },
    },
};
