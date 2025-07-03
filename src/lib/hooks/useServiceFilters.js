import { filters } from "$lib/stores/filters";
import { sortStore } from "$lib/stores/sortStore";
import { searchQuery } from "$lib/stores/searchQuery";
import { locale } from "$lib/stores/locale";
import { applyFiltersAndSort } from "$lib/utils/filterUtils";
import { onDestroy } from "svelte";

export function useServiceFilters(allItems, type, updateCallback) {
    let currentSearch = "";
    let currentSort = null;
    let currentLocale = "ru";
    let currentFilters = {};

    function update() {
        const result = applyFiltersAndSort(
            allItems,
            currentSearch,
            currentLocale,
            currentFilters,
            currentSort,
            type
        );
        updateCallback(result);
    }

    const unsubSearch = searchQuery.subscribe((v) => {
        currentSearch = v.toLowerCase();
        update();
    });

    const unsubSort = sortStore.subscribe((v) => {
        currentSort = v;
        update();
    });

    const unsubLocale = locale.subscribe((v) => {
        currentLocale = v;
        update();
    });

    const unsubFilters = filters.subscribe((v) => {
        currentFilters = v;
        update();
    });

    onDestroy(() => {
        unsubSearch();
        unsubSort();
        unsubLocale();
        unsubFilters();
    });

    return { update };
}
