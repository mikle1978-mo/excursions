// src/lib/features/card/sections/date.adapter.js
import { formatDate } from "$lib/utils/dateFormatter.js";

export function DateBlockAdapter({ item, system, section }) {
    const source = section.source;
    const formattedDate = source ? formatDate(item?.[source], system.lang) : "";

    return {
        section: section ?? {},

        context: {
            href: item?.slug
                ? `/${system.lang}/${system.type}/${item.slug}`
                : "#",
        },

        date: formattedDate,
    };
}
