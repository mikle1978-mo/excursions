// src/lib/constants/filterConfig.js

export const FILTER_CONFIG = {
    price: ["excursions", "yachts", "transfers", "cars"],
    duration: ["excursions", "yachts", "transfers"],
    rating: ["excursions", "yachts", "cars", "transfers"], // например, у трансферов нет рейтинга
};

export const SORT_OPTIONS = {
    price: ["excursions", "yachts", "transfers", "cars"],
    duration: ["excursions"],
    rating: ["excursions", "yachts", "cars", "transfers"],
};
