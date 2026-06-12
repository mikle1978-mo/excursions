<script>
    import { selectedCurrency, setCurrency } from "$lib/stores/currency";
    import { fly } from "svelte/transition";

    const currencies = [
        { value: "USD", label: "$" },
        { value: "EUR", label: "€" },
        { value: "RUB", label: "₽" },
        { value: "TRY", label: "₺" },
    ];

    let isOpen = false;

    const changeCurrency = (currency) => {
        setCurrency(currency);
        isOpen = false;
    };

    const toggleDropdown = () => {
        isOpen = !isOpen;
    };
</script>

<!-- <div class="currency-container">
    <button
        class="currency-button {isOpen ? 'open' : ''}"
        onclick={toggleDropdown}
    >
        <span>
            {#each currencies.filter((c) => c.value === $selectedCurrency) as c}
                {c.label}
            {/each}
        </span>
    </button>

    {#if isOpen}
        <div
            class="currency-dropdown"
            transition:fly={{ y: 10, duration: 200 }}
        >
            {#each currencies as currency}
                <button
                    class="currency-option {$selectedCurrency === currency.value
                        ? 'selected'
                        : ''}"
                    onclick={() => changeCurrency(currency.value)}
                >
                    <span>{currency.label}</span>
                </button>
            {/each}
        </div>
    {/if}
</div> -->

<div class="currency-container">
    <button
        class="currency-button {isOpen ? 'open' : ''}"
        onclick={toggleDropdown}
        aria-label="Выбрать валюту"
        aria-expanded={isOpen}
    >
        {#each currencies.filter((c) => c.value === $selectedCurrency) as c}
            <span>{c.label}</span>
        {/each}
    </button>

    {#if isOpen}
        <div
            class="currency-dropdown"
            transition:fly={{ y: 10, duration: 200 }}
        >
            {#each currencies as currency}
                <button
                    class="currency-option {$selectedCurrency === currency.value
                        ? 'selected'
                        : ''}"
                    onclick={() => changeCurrency(currency.value)}
                >
                    <span>{currency.label}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .currency-container {
        position: relative;
        height: 100%;
        width: 32px;
        height: 32px;
    }

    .currency-button {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        aspect-ratio: 1;
        font-size: var(--text-sm);
        color: var(--color-gray-500);
        background: var(--color-bg);
        border: 2px solid var(--color-gray-500);
        border-radius: var(--radius-full);
        padding: 0;
        box-shadow: var(--shadow-sm);
        transition: all var(--transition-normal);
        cursor: pointer;
    }

    .currency-button span {
        font-size: 0.8rem;
    }

    .currency-button:hover,
    .currency-button.open {
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
        background: var(--color-bg);
    }

    .currency-dropdown {
        position: absolute;
        top: calc(100% + var(--space-vertical-xs));
        left: 50%;
        transform: translate(-50%, 0);
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-xxs);
        padding: var(--space-vertical-xxs) var(--space-horizontal-xxs);
        background: var(--color-bg);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-full);
        box-shadow: var(--shadow-md);
        z-index: 10;
    }

    .currency-option {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5vh;
        height: 5vh;
        font-size: var(--text-sm);
        color: var(--color-text);
        background: var(--color-bg);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-full);
        cursor: pointer;
        transition: all var(--transition-fast);
    }

    .currency-option span {
        font-size: 0.8rem;
    }

    .currency-option:hover {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }

    .currency-option.selected {
        background: var(--color-primary);
        color: white;
        border-color: var(--color-primary);
    }

    @media (prefers-color-scheme: dark) {
        .currency-button {
            border-color: var(--color-gray-600);
        }

        .currency-button:hover,
        .currency-button.open {
            background: var(--color-gray-900);
        }

        .currency-dropdown {
            border-color: var(--color-gray-600);
        }

        .currency-option {
            border-color: var(--color-gray-600);
        }
    }
</style>
