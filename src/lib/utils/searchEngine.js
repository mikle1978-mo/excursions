export function applySearch(items, query, fields = []) {
    if (!query) return items;

    const q = query.toLowerCase();

    return items.filter((item) =>
        fields.some((f) =>
            String(item[f] ?? "")
                .toLowerCase()
                .includes(q),
        ),
    );
}
