<script>
    import { sortStore } from "$lib/stores/sortStore.js";
    import { locale } from "$lib/stores/locale";
    import { onDestroy } from "svelte";
    import { SORT_OPTIONS } from "$lib/constants/filtersConfig";

    export let type = "";

    let selectedSort = null;

    const unsubscribeSort = sortStore.subscribe(
        (value) => (selectedSort = value)
    );
    const unsubscribeLocale = locale.subscribe((value) => ($locale = value));

    const translations = {
        ru: {
            noSort: "Без сортировки",
            priceAsc: "Цена ↑",
            priceDesc: "Цена ↓",
            ratingAsc: "Рейтинг ↑",
            ratingDesc: "Рейтинг ↓",
            durationAsc: "Длительность ↑",
            durationDesc: "Длительность ↓",
        },
        en: {
            noSort: "No sort",
            priceAsc: "Price ↑",
            priceDesc: "Price ↓",
            ratingAsc: "Rating ↑",
            ratingDesc: "Rating ↓",
            durationAsc: "Duration ↑",
            durationDesc: "Duration ↓",
        },
        tr: {
            noSort: "Sıralama yok",
            priceAsc: "Fiyat ↑",
            priceDesc: "Fiyat ↓",
            ratingAsc: "Puan ↑",
            ratingDesc: "Puan ↓",
            durationAsc: "Süre ↑",
            durationDesc: "Süre ↓",
        },
    };

    function handleChange(event) {
        sortStore.set(event.target.value || null);
    }

    function hasSortOption(groupName) {
        return SORT_OPTIONS[groupName]?.includes(type);
    }

    onDestroy(() => {
        unsubscribeSort();
        unsubscribeLocale();
    });
</script>

<div class="sort-container">
    <div class="sort-controls">
        <div class="select-wrapper">
            <select
                id="sort-select"
                on:change={handleChange}
                bind:value={selectedSort}
            >
                <option value={null}>
                    {translations[$locale]?.noSort ?? translations.en.noSort}
                </option>

                {#if hasSortOption("price")}
                    <option value="priceAsc">
                        {translations[$locale]?.priceAsc ??
                            translations.en.priceAsc}
                    </option>
                    <option value="priceDesc">
                        {translations[$locale]?.priceDesc ??
                            translations.en.priceDesc}
                    </option>
                {/if}

                {#if hasSortOption("rating")}
                    <option value="ratingDesc">
                        {translations[$locale]?.ratingDesc ??
                            translations.en.ratingDesc}
                    </option>
                    <option value="ratingAsc">
                        {translations[$locale]?.ratingAsc ??
                            translations.en.ratingAsc}
                    </option>
                {/if}

                {#if hasSortOption("duration")}
                    <option value="durationAsc">
                        {translations[$locale]?.durationAsc ??
                            translations.en.durationAsc}
                    </option>
                    <option value="durationDesc">
                        {translations[$locale]?.durationDesc ??
                            translations.en.durationDesc}
                    </option>
                {/if}
            </select>
            <span class="custom-arrow">▼</span>
        </div>
    </div>
</div>

<style>
    .sort-container {
        display: flex;
        justify-content: flex-end; /* блок сортировки справа */
        width: 100%;
    }

    .sort-controls {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: var(--color-bg, #f9f9f9);
        border-radius: var(--radius-md, 6px);
        padding: 0.3rem 0.5rem;
        max-width: 400px;
        width: 100%;
    }

    .select-wrapper {
        position: relative;
        flex-grow: 1;
    }

    .select-wrapper select {
        width: 100%;
        padding: 0.3rem 1.5rem 0.3rem 0.5rem; /* справа место для стрелки */
        border: 1px solid var(--color-gray-400, #ccc);
        border-radius: var(--radius-md, 6px);
        font-size: var(--text-xs, 0.875rem);
        font-family: inherit;
        color: var(--color-text, #333);
        appearance: none;
        background: var(--color-bg);
        cursor: pointer;
    }
    .select-wrapper select option {
        width: 100%;
        padding: 0.3rem 1.5rem 0.3rem 0.5rem; /* справа место для стрелки */
        border: 1px solid var(--color-gray-400, #ccc);
        border-radius: var(--radius-md, 6px);
        font-size: var(--text-sm, 0.875rem);
        font-family: inherit;
        color: var(--color-text, #333);
        appearance: none;
        background: var(--color-bg);
        cursor: pointer;
    }

    .select-wrapper .custom-arrow {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        pointer-events: none;
        font-size: 0.75rem;
        color: var(--color-gray-600);
    }

    .select-wrapper select:focus {
        outline: none;
        border-color: var(--color-primary, #4ac97e);
        box-shadow: 0 0 3px var(--color-primary, #4ac97e);
    }
</style>
