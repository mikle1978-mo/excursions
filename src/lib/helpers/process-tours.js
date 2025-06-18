import { TOUR_CATEGORIES } from "$lib/constants/categories";
import { TOUR_LABELS } from "$lib/constants/labels";

export const enrichTours = (tours, lang = "en") => {
    return tours.map((tour) => {
        // 1. Категории (проверка по slug)
        const categories = Object.values(TOUR_CATEGORIES)
            .filter((cat) => cat.slugs.includes(tour.slug))
            .map((cat) => cat.label);

        // 2. Лейблы (проверка условий)
        const labels = Object.keys(TOUR_LABELS)
            .map((key) => {
                const labelObj = TOUR_LABELS[key];
                if (labelObj.condition(tour)) {
                    return {
                        key,
                        label: labelObj.label,
                    };
                }
                return null;
            })
            .filter(Boolean);

        return {
            ...tour,
            meta: {
                categories,
                labels,
            },
        };
    });
};
