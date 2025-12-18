// src/lib/features/hero/hero.block.adapter.js
import { ImageAdapter } from "$lib/features/image/image.adapter.js";

export function HeroBlockAdapter({ item, system, overlays, section }) {
    return {
        section: {
            image: ImageAdapter({
                image: item.images[0].url,
                type: system.type,
                defaultImage: `/images/${system.type}/${system.type}_default.webp`,
            }),
            title: item.title || "",
        },

        context: {
            href: item.slug
                ? `/${system.lang}/${system.type}/${item.slug}`
                : "#",
        },

        overlays: {
            badges: overlays?.badges ?? [],
        },
    };
}
