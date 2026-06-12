export function applyFilters(items, filtersConfig, state) {
    return items.filter((item) => {
        for (const key in filtersConfig) {
            const cfg = filtersConfig[key];
            const value = state[key];

            if (value == null) continue;

            const fieldValue = item[cfg.field];

            // RANGE
            if (cfg.type === "range") {
                const [min, max] = value;

                if (fieldValue < min || fieldValue > max) {
                    return false;
                }
            }

            // MIN
            if (cfg.type === "min") {
                if (fieldValue < value) return false;
            }
        }

        return true;
    });
}
