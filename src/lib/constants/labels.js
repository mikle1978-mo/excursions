export const TOUR_LABELS = {
    DISCOUNT: {
        condition: (tour) => tour.discount > 0,
        label: {
            en: "Discount",
            ru: "Скидка",
        },
    },
    NEW: {
        condition: (tour) => {
            const now = new Date();
            const created = new Date(tour.createdAt);
            return now - created < 30 * 24 * 60 * 60 * 1000; // 30 дней
        },
        label: {
            en: "New",
            ru: "Новинка",
        },
    },
    POPULAR: {
        condition: (tour) => tour.rating >= 4.5 && tour.reviewsCount >= 10,
        label: { en: "Popular", ru: "Популярный" },
    },
    VIP: {
        condition: (tour) => tour.price > 300,
        label: { en: "VIP", ru: "VIP" },
    },
};
