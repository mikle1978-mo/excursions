<script>
    import RangeSlider from "$lib/components/ui/inputs/sliders/RangeSlider.svelte";
    // import { locale } from "$lib/stores/locale.js";
    import { createEventDispatcher } from "svelte";
    import { filterState } from "$lib/stores/filterState";

    export let lang = "en";

    export let items = [];

    $: durations = items
        .map((i) => Number(i.duration || 0))
        .filter((d) => d > 0);
    $: minDuration = durations.length ? Math.min(...durations) : 0;
    $: maxDuration = durations.length ? Math.max(...durations) : 0;
    $: currentRange = [
        $filterState.duration?.[0] ?? minDuration,
        $filterState.duration?.[1] ?? maxDuration,
    ];

    const dispatch = createEventDispatcher();
    const labels = {
        duration: {
            en: "by duration",
            ru: "по времени",
        },
        time: {
            en: "h.",
            ru: "ч.",
        },
    };

    function formatDuration(value) {
        return `${value} ${labels.time[lang]}`;
    }
</script>

<div class="filter-group">
    <span class="filter-title">{labels.duration[lang]}</span>
    <RangeSlider
        min={minDuration}
        max={maxDuration}
        values={currentRange}
        format={formatDuration}
        on:change={(e) => dispatch("change", e.detail)}
    />
</div>

<style>
    .filter-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        box-shadow: var(--shadow-sm);
        padding: var(--space-vertical-xs) 0;
    }

    .filter-title {
        font-size: var(--text-md);
        font-weight: 500;
        color: var(--color-text);
    }
</style>
