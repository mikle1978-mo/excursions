export function buildBadges(item, rules, system) {
    return Object.entries(rules)
        .filter(([_, rule]) =>
            typeof rule.condition === "function"
                ? rule.condition(item, system)
                : true
        )
        .map(([key, rule]) => ({
            key,
            position: rule.position,
            text: rule.format
                ? rule.format(item, system)
                : rule.label?.[system.lang],
        }));
}
