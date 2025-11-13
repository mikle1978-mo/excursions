export function getCloudinarySrcset(url, widths = [200, 400, 600, 800, 980]) {
    if (!url?.includes("/upload/")) return { src: url, srcset: "" };

    const sortedWidths = [...widths].sort((a, b) => a - b);

    const [prefixPart, suffixPart] = url.split("/upload/");
    const suffix = suffixPart;
    const prefix = `${prefixPart}/upload/f_auto,q_auto,`;

    const srcset = sortedWidths
        .map((w) => `${prefix}w_${w}/${suffix} ${w}w`)
        .join(", ");

    const src = `${prefix}w_${sortedWidths[0]}/${suffix}`;

    return { src, srcset };
}
