export function applySort(items, sort) {
    if (!sort?.field) return items;

    return [...items].sort((a, b) => {
        const aV = a[sort.field];
        const bV = b[sort.field];

        if (sort.dir === "asc") return aV > bV ? 1 : -1;

        return aV < bV ? 1 : -1;
    });
}
