<script>
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    export let value = "";
    export let label = "";
    export let field = "";
    export let errors = {};
    export let placeholder = "";
</script>

<label>
    {label}:
    <input type="text" bind:value {placeholder} />
    <ErrorMessage {field} {errors} />
</label>

<style>
    input {
        padding: 0.4rem 0.6rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
    }
    input:focus {
        outline-color: var(--color-primary);
    }
    @media (prefers-color-scheme: dark) {
        input {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
