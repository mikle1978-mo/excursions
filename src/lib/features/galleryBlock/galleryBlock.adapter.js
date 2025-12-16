// src/lib/features/galleryBlock/galleryBlock.adapter.js
import { appConfig } from "$lib/config/app.config";
import { getCloudinarySrcset } from "$lib/helpers/optimizeCloudinary";

const defaultImage = "/images/excursions/excursions_default.webp";

export function GalleryBlockAdapter({ item, system }) {
    const { lang } = system;
    const config = appConfig.blocks.gallery;

    const images = item.images || [];
    const title = item.title || "";

    const thumbs = images.map((img, index) => ({
        ...img,
        thumb: getCloudinarySrcset(img.url, [200, 400]),
        modal: getCloudinarySrcset(img.url, [800, 1200, 1600]),
        alt:
            img.alt ||
            config.photo_alt[lang]
                .replace("{title}", title)
                .replace("{current}", index + 1)
                .replace("{total}", images.length),
        caption: config.photo_caption[lang]
            .replace("{title}", title)
            .replace("{current}", index + 1)
            .replace("{total}", images.length),
    }));

    return {
        images: thumbs,
        openLabel: config.open_gallery[lang],
        defaultImage,
    };
}
