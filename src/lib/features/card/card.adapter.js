import { isDiscountActive } from "$lib/features/priceBlock/priceBlock.utils";
import { ImageAdapter } from "$lib/features/image/image.adapter";

export function CardAdapter({ item, lang, type, badgeRules }) {
    const defaultImage = `/images/${type}/${type}_default.webp`;
    const discountActive = isDiscountActive(item.discount, item.discountEnd);

    const oldPrice =
        discountActive && item.discount ? item.price + item.discount : null;

    const badges = Object.entries(badgeRules)
        .filter(([_, rule]) =>
            typeof rule.condition === "function" ? rule.condition(item) : true
        )
        .map(([key, rule]) => ({
            key,
            position: rule.position,
            text: rule.format ? rule.format(item) : rule.label?.[lang],
        }));

    return {
        title: item.title,
        slug: item.slug,
        href: `/${lang}/${type}/${item.slug}`,

        image: ImageAdapter({
            image: item.image,
            type,
            defaultImage,
        }),

        price: {
            value: item.price,
            old: oldPrice,
        },

        rating:
            item.reviewsCount > 0
                ? {
                      value: item.rating,
                      count: item.reviewsCount,
                  }
                : null,

        badges,

        defaultImage: `/images/${type}/${type}_default.webp`,
    };
}
