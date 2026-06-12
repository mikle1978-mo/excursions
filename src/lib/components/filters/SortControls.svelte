<script>
    import { sortStore } from "$lib/stores/sortStore.js";
    import { list } from "$lib/config/list/list.config.js";

    export let type = "";
    export let lang = "en";

    let isOpen = false;

    $: currentSort = $sortStore;

    const translations = {
        ru: {
            noSort: "Cортировка",

            priceAsc: "Цена ↑",
            priceDesc: "Цена ↓",

            ratingAsc: "Рейтинг ↑",
            ratingDesc: "Рейтинг ↓",

            durationAsc: "Длительность ↑",
            durationDesc: "Длительность ↓",

            publishDateAsc: "Старые сначала",
            publishDateDesc: "Новые сначала",
        },

        en: {
            noSort: "Sort",

            priceAsc: "Price ↑",
            priceDesc: "Price ↓",

            ratingAsc: "Rating ↑",
            ratingDesc: "Rating ↓",

            durationAsc: "Duration ↑",
            durationDesc: "Duration ↓",

            publishDateAsc: "Oldest first",
            publishDateDesc: "Newest first",
        },

        tr: {
            noSort: "Sıralama",

            priceAsc: "Fiyat ↑",
            priceDesc: "Fiyat ↓",

            ratingAsc: "Puan ↑",
            ratingDesc: "Puan ↓",

            durationAsc: "Süre ↑",
            durationDesc: "Süre ↓",

            publishDateAsc: "Eskiler önce",
            publishDateDesc: "Yeniler önce",
        },
    };

    const options = [
        { value: null, labelKey: "noSort" },

        { value: "priceAsc", labelKey: "priceAsc", group: "price" },
        { value: "priceDesc", labelKey: "priceDesc", group: "price" },

        { value: "ratingAsc", labelKey: "ratingAsc", group: "rating" },
        { value: "ratingDesc", labelKey: "ratingDesc", group: "rating" },

        { value: "durationAsc", labelKey: "durationAsc", group: "duration" },
        { value: "durationDesc", labelKey: "durationDesc", group: "duration" },

        {
            value: "publishDateAsc",
            labelKey: "publishDateAsc",
            group: "publishDate",
        },
        {
            value: "publishDateDesc",
            labelKey: "publishDateDesc",
            group: "publishDate",
        },
    ];

    function toggle() {
        isOpen = !isOpen;
    }

    function setSort(value) {
        if (!value) {
            sortStore.set(null);
            isOpen = false;
            return;
        }

        const dir = value.endsWith("Asc") ? "asc" : "desc";

        const field = value.replace("Asc", "").replace("Desc", "");

        sortStore.set({
            field,
            dir,
        });

        isOpen = false;
    }

    function getAvailableGroups() {
        return list?.[type]?.toolbar?.sort ?? [];
    }

    function isAllowed(opt) {
        if (!opt.group) return true;

        return getAvailableGroups().includes(opt.group);
    }
    function getLabel(sort) {
        const s = sort ?? list?.[type]?.toolbar?.defaultSort ?? null;
        if (!s) return translations[lang]?.noSort;

        const value = s.field + (s.dir === "asc" ? "Asc" : "Desc");
        const option = options.find((o) => o.value === value);
        return translations[lang]?.[option?.labelKey] ?? translations.en.noSort;
    }

    function isSelected(value) {
        const s = currentSort ?? list?.[type]?.toolbar?.defaultSort ?? null;
        if (!s || !value) return false;
        return value === `${s.field}${s.dir === "asc" ? "Asc" : "Desc"}`;
    }
</script>

<div class="sort-container">
    <button class="sort-button {isOpen ? 'open' : ''}" on:click={toggle}>
        {getLabel(currentSort)}
    </button>

    {#if isOpen}
        <div class="sort-dropdown">
            {#each options as opt}
                {#if isAllowed(opt)}
                    <button
                        class="sort-option {isSelected(opt.value)
                            ? 'selected'
                            : ''}"
                        on:click={() => setSort(opt.value)}
                    >
                        {translations[lang]?.[opt.labelKey] ??
                            translations.en[opt.labelKey]}
                    </button>
                {/if}
            {/each}
        </div>
    {/if}
</div>

<style>
    .sort-container {
        position: relative;
        width: 100%;
        height: 32px;
    }

    .sort-button {
        width: 100%;
        height: 32px;

        display: flex;
        align-items: center;
        justify-content: center;

        background: var(--color-bg);
        border: 2px solid var(--color-gray-500);
        border-radius: var(--radius-full);

        cursor: pointer;
        transition: all 0.2s ease;
        font-size: var(--text-xs);
        color: var(--color-text);
    }

    .sort-button:hover,
    .sort-button.open {
        border-color: var(--color-primary);
    }

    .sort-dropdown {
        width: 100%;
        position: absolute;
        top: calc(100% + 6px);
        left: 50%;
        transform: translateX(-50%);

        display: flex;
        flex-direction: column;
        gap: 4px;

        padding: 4px;
        background: var(--color-bg);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-sm);

        box-shadow: var(--shadow-md);
        z-index: 20;
        min-width: 140px;
    }

    .sort-option {
        padding: 6px 10px;

        display: flex;
        justify-content: center;

        border-radius: var(--radius-full);
        border: 1px solid var(--color-gray-300);
        background: var(--color-bg);

        cursor: pointer;
        font-size: var(--text-xs);
        color: var(--color-text);
        transition: all 0.2s ease;
    }

    .sort-option:hover,
    .sort-option.selected {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }
</style>
