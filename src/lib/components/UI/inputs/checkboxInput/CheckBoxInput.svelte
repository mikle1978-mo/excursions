<script>
    import ErrorMessage from "$lib/components/ui/error/ErrorMessage.svelte";
    export let value = false; // привязка снаружи через bind:value
    export let label = "Активна (отображать на сайте)";
    export let field = "";
    export let errors = {};
    export let disabled = false;
</script>

<label class="checkbox" for={field}>
    <input type="checkbox" id={field} bind:checked={value} {disabled} />
    {label}
</label>

<ErrorMessage {field} {errors} />

<style>
    .checkbox {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: var(--text-md);
        color: var(--color-text);
        padding: 0.3rem 0;
    }

    .checkbox input[type="checkbox"] {
        width: 1.1rem;
        height: 1.1rem;
        accent-color: var(
            --color-primary
        ); /* поддерживается во всех современных браузерах */
        border: 1px solid var(--color-gray-400);
        border-radius: var(--radius-sm);
        cursor: pointer;
    }
    @media (prefers-color-scheme: dark) {
        input {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
