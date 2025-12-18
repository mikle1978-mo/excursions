// src/lib/features/card/sections/text.adapter.js

export function TextBlockAdapter({ item, system, section }) {
    const source = section.source;

    return {
        section: section ?? {},

        context: {
            href: item?.slug
                ? `/${system.lang}/${system.type}/${item.slug}`
                : "#",
        },

        text: source ? item?.[source] ?? "" : "",
    };
}
