<script>
    import { createEventDispatcher } from "svelte";
    export let min;
    export let max;
    export let step = 1;
    export let values = [min, max];
    export let format = (v) => v;

    const dispatch = createEventDispatcher();

    function handleInput(index, e) {
        const newValues = [...values];
        newValues[index] = Number(e.target.value);

        // Ensure min <= max
        if (index === 0 && newValues[0] > newValues[1])
            newValues[1] = newValues[0];
        if (index === 1 && newValues[1] < newValues[0])
            newValues[0] = newValues[1];

        dispatch("change", newValues);
    }
</script>

<div class="range-container">
    <div class="range-values">
        <span>{format(values[0])}</span>
        <span>{format(values[1])}</span>
    </div>
    <div class="double-range-slider">
        <div class="range-track">
            <div
                class="range-progress"
                style={`left: ${((values[0] - min) / (max - min)) * 100}%; right: ${100 - ((values[1] - min) / (max - min)) * 100}%`}
            ></div>
        </div>
        <input
            type="range"
            {min}
            {max}
            {step}
            value={values[0]}
            on:input={(e) => handleInput(0, e)}
            class="range-thumb range-thumb--left"
        />
        <input
            type="range"
            {min}
            {max}
            {step}
            value={values[1]}
            on:input={(e) => handleInput(1, e)}
            class="range-thumb range-thumb--right"
        />
    </div>
</div>

<style>
    .range-container {
        padding: 0;
    }

    .double-range-slider {
        position: relative;
        height: 30px;
    }

    .range-track {
        position: absolute;
        height: 4px;
        width: 100%;
        background: #e0e0e0;
        top: 20px;
        border-radius: 2px;
        overflow: hidden; /* Для обрезания прогресса */
    }

    .range-progress {
        position: absolute;
        height: 100%;
        background: var(--color-primary); /* Используем ваш основной цвет */
        top: 0;
    }

    .range-thumb {
        position: absolute;
        width: 100%;
        pointer-events: none;
        appearance: none;
        -webkit-appearance: none;
        height: 2px;
        background: transparent;
        top: 20px;
        margin: 0;
    }

    .range-thumb::-webkit-slider-thumb {
        pointer-events: all;
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--color-primary);
        cursor: pointer;
        border: none;
    }

    .range-thumb--left {
        z-index: 3;
    }

    .range-thumb--right {
        z-index: 4;
    }

    .range-values {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 14px;
    }
</style>
