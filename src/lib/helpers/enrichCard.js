import { CARD_CATEGORIES } from "$lib/constants/categories";
import { CARD_LABELS } from "$lib/constants/labels";

export const enrichCard = (items, lang = "en") => {
    return items.map((item) => {
        // 1. Категории (проверка по slug)
        const categories = Object.values(CARD_CATEGORIES)
            .filter((cat) => cat.slugs.includes(item.slug))
            .map((cat) => cat.label);

        // 2. Лейблы (проверка условий)
        const labels = Object.keys(CARD_LABELS)
            .map((key) => {
                const labelObj = CARD_LABELS[key];
                if (labelObj.condition(item)) {
                    return {
                        key,
                        label: labelObj.label,
                    };
                }
                return null;
            })
            .filter(Boolean);

        return {
            ...item,
            meta: {
                categories,
                labels,
            },
        };
    });
};
