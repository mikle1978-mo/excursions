// src/lib/config/cache/cache.config.js

export const cache = {
    excursions: { ttl: 3600 * 24, prefix: "excursions" },
    yachts: { ttl: 3600 * 24, prefix: "yachts" },
    cars: { ttl: 3600 * 24, prefix: "cars" },
    transfers: { ttl: 3600 * 24, prefix: "transfers" },
    places: { ttl: 3600 * 24, prefix: "places" },
    blogs: { ttl: 3600 * 24, prefix: "blogs" },
    faqs: { ttl: 3600 * 24, prefix: "faqs" },
};
