// src\lib\features\card\sections\image.adapter.js

import { ImageAdapter } from "$lib/features/image/image.adapter.js";

export function ImageBlockAdapter({ item, config, system }) {
    return ImageAdapter({
        image: item.image,
        type: system.type,
        defaultImage: `/images/${system.type}/${system.type}_default.webp`,
    });
}
