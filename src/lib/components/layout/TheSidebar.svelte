<script>
    import { locale } from "$lib/stores/locale.js";
    import { excursions } from "$lib/data/excursions";

    // Фильтры
    let durationFilter = [];
    let priceRange = [0, 5000];
    let groupSizeFilter = [];
    let ratingFilter = 0;

    // Уникальные значения для фильтров
    $: durations = [...new Set(excursions.map((e) => e.duration))];
    $: groupSizes = [...new Set(excursions.map((e) => e.groupSize))];
    $: maxPrice = Math.max(...excursions.map((e) => e.price));

    // Обновление цены
    $: priceRange = [0, maxPrice];

    const toggleDuration = (duration) => {
        durationFilter = durationFilter.includes(duration)
            ? durationFilter.filter((d) => d !== duration)
            : [...durationFilter, duration];
    };

    const toggleGroupSize = (size) => {
        groupSizeFilter = groupSizeFilter.includes(size)
            ? groupSizeFilter.filter((s) => s !== size)
            : [...groupSizeFilter, size];
    };
</script>

<side class="sidebar">
    <div class="sidebar-content">
        <h3 class="sidebar-title">Фильтры экскурсий</h3>

        <!-- Фильтр по продолжительности -->
        <div class="filter-group">
            <h4 class="filter-title">Продолжительность</h4>
            <div class="filter-options">
                {#each durations as duration}
                    <label class="filter-option">
                        <input
                            type="checkbox"
                            bind:group={durationFilter}
                            value={duration}
                            on:change={() => toggleDuration(duration)}
                        />
                        <span class="custom-checkbox"></span>
                        {duration}
                    </label>
                {/each}
            </div>
        </div>

        <!-- Фильтр по цене -->
        <div class="filter-group">
            <h4 class="filter-title">Цена, ₽</h4>
            <div class="price-range">
                <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="100"
                    bind:value={priceRange[0]}
                    class="range-slider"
                />
                <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    step="100"
                    bind:value={priceRange[1]}
                    class="range-slider"
                />
            </div>
            <div class="price-values">
                <span>{priceRange[0]} ₽</span>
                <span>{priceRange[1]} ₽</span>
            </div>
        </div>

        <!-- Фильтр по размеру группы -->
        <div class="filter-group">
            <h4 class="filter-title">Размер группы</h4>
            <div class="filter-options">
                {#each groupSizes as size}
                    <label class="filter-option">
                        <input
                            type="checkbox"
                            bind:group={groupSizeFilter}
                            value={size}
                            on:change={() => toggleGroupSize(size)}
                        />
                        <span class="custom-checkbox"></span>
                        {size}
                    </label>
                {/each}
            </div>
        </div>

        <!-- Фильтр по рейтингу -->
        <div class="filter-group">
            <h4 class="filter-title">Рейтинг</h4>
            <div class="rating-stars">
                {#each [1, 2, 3, 4, 5] as star}
                    <button
                        class="star {ratingFilter >= star ? 'active' : ''}"
                        on:click={() => (ratingFilter = star)}
                    >
                        ★
                    </button>
                {/each}
                {#if ratingFilter > 0}
                    <button
                        class="clear-rating"
                        on:click={() => (ratingFilter = 0)}
                    >
                        &times;
                    </button>
                {/if}
            </div>
        </div>

        <!-- Кнопка сброса фильтров -->
        <button
            class="reset-filters"
            on:click={() => {
                durationFilter = [];
                priceRange = [0, maxPrice];
                groupSizeFilter = [];
                ratingFilter = 0;
            }}
        >
            Сбросить все фильтры
        </button>
    </div>
</side>

<style>
    .sidebar {
        height: 100%;
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        background-color: var(--color-bg);
        border-right: 1px solid var(--color-gray-300);
        overflow-y: auto;
        position: sticky;
        top: 0;
        transition: var(--transition-normal);
    }

    .sidebar-content {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-lg);
    }

    .sidebar-title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-primary);
    }

    .filter-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
        padding-bottom: var(--space-vertical-md);
        border-bottom: 1px solid var(--color-gray-200);
    }

    .filter-title {
        font-size: var(--text-md);
        font-weight: 500;
        color: var(--color-text);
    }

    .filter-options {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }

    .filter-option {
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xs);
        font-size: var(--text-sm);
        cursor: pointer;
        padding: var(--space-vertical-xxs) 0;
        transition: var(--transition-fast);

        &:hover {
            color: var(--color-primary);
        }
    }

    .custom-checkbox {
        width: 16px;
        height: 16px;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition-fast);

        input:checked + & {
            background-color: var(--color-primary);
            border-color: var(--color-primary);
        }

        &::after {
            content: "✓";
            color: white;
            font-size: 10px;
            opacity: 0;
            transition: var(--transition-fast);
        }

        input:checked + &::after {
            opacity: 1;
        }
    }

    .price-range {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
        position: relative;
        height: 40px;
    }

    .range-slider {
        width: 100%;
        height: 4px;
        appearance: none;
        -webkit-appearance: none;
        background: var(--color-gray-300);
        outline: none;
        border-radius: var(--radius-full);

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 16px;
            height: 16px;
            background: var(--color-primary);
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition-fast);

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .price-values {
        display: flex;
        justify-content: space-between;
        font-size: var(--text-sm);
        color: var(--color-gray-600);
    }

    .rating-stars {
        display: flex;
        gap: var(--space-horizontal-xs);
        align-items: center;
    }

    .star {
        font-size: var(--text-lg);
        color: var(--color-gray-400);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        transition: var(--transition-fast);

        /* &.active {
            color: var(--color-warning);
        }

        &:hover {
            transform: scale(1.2);
        } */
    }

    .clear-rating {
        margin-left: var(--space-horizontal-sm);
        font-size: var(--text-sm);
        color: var(--color-error);
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.7;

        &:hover {
            opacity: 1;
        }
    }

    .reset-filters {
        margin-top: var(--space-vertical-sm);
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        background: none;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-md);
        color: var(--color-gray-600);
        cursor: pointer;
        transition: var(--transition-fast);
        font-size: var(--text-sm);

        &:hover {
            border-color: var(--color-error);
            color: var(--color-error);
            background-color: rgba(208, 48, 47, 0.05);
        }
    }

    @media (max-width: 768px) {
        .sidebar {
            position: fixed;
            top: 0;
            left: -280px;
            z-index: var(--z-index-modal);
            box-shadow: var(--shadow-lg);
            height: 100vh;

            /* &.active {
                left: 0;
            } */
        }
    }
</style>
