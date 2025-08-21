<script>
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";

    export let value = "";
    export let label = "Дата";
    export let field = "";
    export let errors = {};

    // Если не передали value → пустая строка (без дефолтной даты)
    if (value === undefined || value === null) {
        value = "";
    }
</script>

<div class="label">
    <slot>{label}</slot>
    <div class="date-input">
        <input type="date" bind:value />
    </div>
</div>
<ErrorMessage {field} {errors} />

<style>
    .label {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .date-input {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    input[type="date"] {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        background-color: var(--color-light);
        color: var(--color-text);
        transition:
            border var(--transition-fast),
            box-shadow var(--transition-fast);
    }

    input[type="date"]:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(74, 201, 126, 0.3);
    }

    @media (prefers-color-scheme: dark) {
        input[type="date"] {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
