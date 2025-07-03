import { writable } from "svelte/store";

export const sortStore = writable(null);

export function setSort(value) {
    sortStore.set(value);
}

export function resetSort() {
    sortStore.set(null);
}
