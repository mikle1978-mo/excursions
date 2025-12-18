export function TitleBlockAdapter({ item, system, overlays, section }) {
    return {
        section: section ?? {},
        context: {
            href: item?.slug
                ? `/${system.lang}/${system.type}/${item.slug}`
                : "#",
        },
        title: item?.title ?? "",
    };
}
