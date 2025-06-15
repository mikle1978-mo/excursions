<script>
    import RangeSlider from "$lib/components/UI/inputs/sliders/RangeSlider.svelte";
    import { locale } from "$lib/stores/locale.js";
    import { createEventDispatcher } from "svelte";

    export let durations = [];
    export let currentRange = [];

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
        return `${value} ${labels.time[$locale]}`;
    }

    $: minDuration = Math.min(...durations);
    $: maxDuration = Math.max(...durations);
    $: initialRange = currentRange.length
        ? currentRange
        : [minDuration, maxDuration];
</script>

<div class="filter-group">
    <span class="filter-title">{labels.duration[$locale]}</span>
    <RangeSlider
        min={minDuration}
        max={maxDuration}
        values={initialRange}
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
