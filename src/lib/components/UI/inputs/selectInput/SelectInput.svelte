<script>
    import ErrorMessage from "$lib/components/ui/error/ErrorMessage.svelte";

    export let value = "";
    export let label = "";
    export let field = "";
    export let errors = {};
    export let options = [];
</script>

<label class="custom-select-label">
    {label}:
    <select bind:value>
        <option {value} disabled selected>Выберите тип</option>
        {#each options as opt}
            <option value={opt.value}>{opt.label}</option>
        {/each}
    </select>
    <ErrorMessage {field} {errors} />
</label>

<style>
    label.custom-select-label {
        display: flex;
        flex-direction: column;
        font-weight: 500;
        margin-bottom: 1rem;
    }
    select {
        padding: 0.4rem 0.6rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 1rem;
        margin-top: 0.3rem;
        cursor: pointer;
        /* Добавь свои стили */
    }
    select:focus {
        outline-color: var(--color-primary);
    }
    @media (prefers-color-scheme: dark) {
        select {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
