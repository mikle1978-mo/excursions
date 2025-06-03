<script>
    import { locale } from "$lib/stores/locale.js";
    import { sidebarOpen } from "$lib/stores/sidebar";
    import { onMount, createEventDispatcher } from "svelte";

    export let excursions;

    const dispatch = createEventDispatcher();

    // Состояние фильтров
    let filters = {
        durations: [],
        priceRange: [0, 5000],
        groupSizes: [],
        minRating: 0,
    };

    // Уникальные значения для фильтров
    $: durations = [...new Set(excursions.map((e) => e.duration))].sort(
        (a, b) => a - b
    );
    $: groupSizes = [...new Set(excursions.map((e) => e.groupSize))].sort(
        (a, b) => a - b
    );
    $: maxPrice = Math.max(...excursions.map((e) => e.price));

    // Инициализация диапазона цен
    $: filters.priceRange = [0, maxPrice];

    // Отправка изменений фильтров
    $: dispatch("filtersChanged", filters);

    // Методы для управления фильтрами
    const toggleDuration = (duration) => {
        filters.durations = filters.durations.includes(duration)
            ? filters.durations.filter((d) => d !== duration)
            : [...filters.durations, duration];
    };

    const toggleGroupSize = (size) => {
        filters.groupSizes = filters.groupSizes.includes(size)
            ? filters.groupSizes.filter((s) => s !== size)
            : [...filters.groupSizes, size];
    };

    const setRating = (rating) => {
        filters.minRating = rating;
    };

    const resetFilters = () => {
        filters = {
            durations: [],
            priceRange: [0, maxPrice],
            groupSizes: [],
            minRating: 0,
        };
    };

    // Адаптивность
    let isMobile = false;

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth < 768;
            if (!isMobile) sidebarOpen.set(false);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    });

    const closeSidebar = () => sidebarOpen.set(false);
    const handleKeydown = (e) =>
        e.key === "Escape" && $sidebarOpen && isMobile && closeSidebar();
    const handleBackdropClick = () => closeSidebar();
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $sidebarOpen && isMobile}
    <div
        class="sidebar-overlay"
        role="presentation"
        on:click={handleBackdropClick}
        on:keydown={(e) => e.key === "Enter" && closeSidebar()}
    ></div>
{/if}

<side class="sidebar" class:active={$sidebarOpen && isMobile}>
    <div class="sidebar-content">
        <h3 class="sidebar-title">Фильтры экскурсий</h3>
        <div class="filters">
            <!-- Фильтр по цене -->
            <div class="filter-group">
                <h4 class="filter-title">Цена</h4>
                <div class="price-range">
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10"
                        bind:value={filters.priceRange[0]}
                        class="range-slider"
                    />
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="10"
                        bind:value={filters.priceRange[1]}
                        class="range-slider"
                    />
                </div>
                <div class="price-values">
                    <span>{filters.priceRange[0]} ₽</span>
                    <span>{filters.priceRange[1]} ₽</span>
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
                                checked={filters.groupSizes.includes(size)}
                                on:change={() => toggleGroupSize(size)}
                            />
                            <span class="checkbox-container">
                                <span class="custom-checkbox"></span>
                            </span>
                            <span class="filter-label">{size} чел</span>
                        </label>
                    {/each}
                </div>
            </div>

            <!-- Фильтр по продолжительности -->
            <div class="filter-group">
                <h4 class="filter-title">Продолжительность</h4>
                <div class="filter-options">
                    {#each durations as duration}
                        <label class="filter-option">
                            <input
                                type="checkbox"
                                checked={filters.durations.includes(duration)}
                                on:change={() => toggleDuration(duration)}
                            />
                            <span class="checkbox-container">
                                <span class="custom-checkbox"></span>
                            </span>
                            <span class="filter-label">{duration} ч</span>
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
                            class="star {filters.minRating >= star
                                ? 'active'
                                : ''}"
                            on:click={() => setRating(star)}
                        >
                            ★
                        </button>
                    {/each}
                    {#if filters.minRating > 0}
                        <button
                            class="clear-rating"
                            on:click={() => setRating(0)}
                        >
                            &times;
                        </button>
                    {/if}
                </div>
            </div>
        </div>

        <!-- Кнопки -->
        <div class="buttons">
            <button class="confirm-filters" on:click={closeSidebar}>
                Применить
            </button>
            <button class="reset-filters" on:click={resetFilters}>
                Сбросить
            </button>
        </div>
    </div>

    {#if isMobile}
        <button class="close-button" on:click={closeSidebar}>✕</button>
    {/if}
</side>

<style>
    .sidebar {
        height: 100dvh;
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        background-color: var(--color-bg);
        border-right: 1px solid var(--color-gray-300);
        overflow: hidden;
        position: sticky;
        top: 0;
        transition: var(--transition-normal);
    }

    .sidebar-content {
        display: grid;
        grid-template-rows: auto 1fr auto;
        height: 100%;
        flex-direction: column;
        gap: var(--space-vertical-md);
    }

    .sidebar-title {
        font-size: var(--text-lg);
        font-weight: 600;
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-primary);
    }
    .filters {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
        overflow-y: auto;
        max-height: calc(
            100svh - 200px
        ); /* Учитываем высоту заголовка и кнопок */
    }

    .filter-group {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
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

    /* Общие стили для чекбоксов */
    .filter-option {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        position: relative;
        padding-left: 28px;
        user-select: none;
        min-height: 24px; /* Добавим минимальную высоту */
    }

    /* Скрываем нативные чекбоксы */
    .filter-option input[type="checkbox"] {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    /* Контейнер для кастомного чекбокса */
    .checkbox-container {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* Визуальная часть чекбокса */
    .custom-checkbox {
        width: 18px;
        height: 18px;
        border: 2px solid var(--color-gray-400);
        border-radius: 3px;
        background-color: var(--color-bg);
        transition: all 0.2s ease;
        position: relative;
        box-sizing: border-box;
    }

    /* Галочка - теперь идеально по центру */
    .custom-checkbox::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: translate(-50%, -60%) rotate(45deg); /* Точное позиционирование */
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    /* Состояние отмеченного чекбокса */
    .filter-option input:checked ~ .checkbox-container .custom-checkbox {
        background-color: var(--color-primary);
        border-color: var(--color-primary);
    }

    .filter-option input:checked ~ .checkbox-container .custom-checkbox::after {
        opacity: 1;
    }

    /* Состояния взаимодействия */
    .filter-option:hover .custom-checkbox {
        border-color: var(--color-primary);
    }

    .filter-option input:focus-visible ~ .checkbox-container .custom-checkbox {
        box-shadow: 0 0 0 2px rgba(74, 201, 126, 0.3);
        outline: none;
    }

    /* Текст метки */
    .filter-label {
        font-size: var(--text-sm);
        color: var(--color-text);
        line-height: 1.4;
    }

    .price-range {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-md);
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
    }

    .range-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 16px;
        height: 16px;
        background: var(--color-primary);
        border-radius: 50%;
        cursor: pointer;
        transition: var(--transition-fast);
    }

    .range-slider::-webkit-slider-thumb:hover {
        transform: scale(1.2);
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
    }

    .star.active {
        color: var(--color-warning);
    }

    .star:hover {
        transform: scale(1.2);
    }

    .clear-rating {
        margin-left: var(--space-horizontal-sm);
        font-size: var(--text-sm);
        color: var(--color-error);
        background: none;
        border: none;
        cursor: pointer;
        opacity: 0.7;
    }

    .clear-rating:hover {
        opacity: 1;
    }
    .buttons {
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xs);
    }
    .confirm-filters,
    .reset-filters {
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        background: none;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-md);
        color: var(--color-gray-600);
        cursor: pointer;
        transition: var(--transition-fast);
        font-size: var(--text-sm);
    }

    .confirm-filters {
        border-color: var(--color-success);
        color: var(--color-success);
    }
    .confirm-filters:hover {
        border-color: var(--color-success);
        color: var(--color-success);
        background-color: rgba(208, 48, 47, 0.05);
    }
    .reset-filters:hover {
        border-color: var(--color-error);
        color: var(--color-error);
        background-color: rgba(208, 48, 47, 0.05);
    }

    .sidebar-overlay {
        position: fixed;
        inset: 0;
        background-color: rgba(var(--color-dark-rgb), 0.5);
        z-index: 999;
        backdrop-filter: blur(2px);
        transition: opacity 0.3s ease;
        cursor: pointer;
    }

    @media (prefers-color-scheme: dark) {
        .sidebar-overlay {
            background-color: rgba(var(--color-dark-rgb), 0.7);
        }
    }

    @media (max-width: 768px) {
        .sidebar {
            position: fixed;
            top: 0;
            left: -300px;
            width: 280px;
            height: 100vh;
            z-index: 1000;
            transition: transform 0.3s ease;
        }

        .sidebar.active {
            transform: translateX(300px);
        }

        .close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: transparent;
            border: none;
            font-size: 1.5rem;
            color: var(--color-text);
            cursor: pointer;
        }
    }
</style>
