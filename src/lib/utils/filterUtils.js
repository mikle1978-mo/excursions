// src/lib/utils/filterUtils.js
import { get } from "svelte/store";
import { filters } from "$lib/stores/filters.js";
import { sortStore } from "$lib/stores/sortStore.js";

export function applyFiltersAndSort(
    allItems,
    search,
    locale,
    filters,
    sort,
    type = "default"
) {
    let filtered = allItems.filter((item) => {
        if (!item.active) return false;

        const price = item.price || item.priceUSD || 0;
        const priceMatch = filters.priceRange
            ? price >= filters.priceRange[0] && price <= filters.priceRange[1]
            : true;

        const durationMatch = filters.durationRange
            ? item.duration >= filters.durationRange[0] &&
              item.duration <= filters.durationRange[1]
            : true;

        const ratingMatch =
            filters.minRating === 0 ||
            (item.rating !== null && item.rating >= filters.minRating);

        const matchesSearch =
            !search || item.title?.[locale]?.toLowerCase().includes(search);

        return priceMatch && durationMatch && ratingMatch && matchesSearch;
    });

    switch (sort) {
        case "priceAsc":
            filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case "priceDesc":
            filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
        case "ratingDesc":
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case "durationAsc":
            filtered.sort((a, b) => (a.duration || 0) - (b.duration || 0));
            break;
    }

    return filtered;
}
