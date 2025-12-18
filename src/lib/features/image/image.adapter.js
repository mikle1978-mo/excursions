// src\lib\features\image\image.adapter.js

import { getCloudinarySrcset } from "$lib/helpers/optimizeCloudinary";

export function ImageAdapter({
    image,
    type,
    loading = "lazy",
    sizes = [400, 600, 800, 980],
    defaultImage,
}) {
    const url = image || defaultImage;

    const { src, srcset } = getCloudinarySrcset(url, sizes);

    return {
        src,
        srcset,
        loading,
        sizesAttr: "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw",
        decoding: "async",
        fetchpriority: loading === "eager" ? "high" : "auto",
        width: "600",
        height: "338",
        alt: `Image of ${type}`,
    };
}
