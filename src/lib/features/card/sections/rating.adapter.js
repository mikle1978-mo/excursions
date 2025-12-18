export function RatingBlockAdapter({ item, system, overlays, section }) {
    return {
        section: section ?? {},
        context: {
            href: item?.slug
                ? `/${system.lang}/${system.type}/${item.slug}`
                : "#",
        },
        value: item.rating || 5,
        count: item.reviewsCount || 0,
    };
}
