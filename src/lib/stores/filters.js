// src/lib/stores/filters.js
import { writable, derived } from "svelte/store";

export const filters = writable({
    priceRange: null,
    durationRange: null,
    minRating: 0,
});

export const hasFilter = derived(filters, ($filters) => {
    const { priceRange, durationRange, minRating } = $filters;
    const isPriceSet =
        priceRange && (priceRange[0] !== 0 || priceRange[1] !== 0);
    const isDurationSet =
        durationRange && (durationRange[0] !== 0 || durationRange[1] !== 0);
    return isPriceSet || isDurationSet || minRating > 0;
});

export function setFilters(newFilters) {
    filters.update((old) => ({ ...old, ...newFilters }));
}

export function resetFilters() {
    filters.set({
        priceRange: null,
        durationRange: null,
        minRating: 0,
    });
}
