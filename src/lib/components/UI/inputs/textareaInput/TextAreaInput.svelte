<script>
    import ErrorMessage from "$lib/components/UI/error/ErrorMessage.svelte";
    export let value = "";
    export let label = "";
    export let field = "";
    export let errors = {};
    export let placeholder = "";
    export let rows = 4;
</script>

<label>
    {label}:
    <textarea bind:value {placeholder} {rows}></textarea>
    <ErrorMessage {field} {errors} />
</label>

<style>
    textarea {
        padding: 0.4rem 0.6rem;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        resize: vertical;
    }
    textarea:focus {
        outline-color: var(--color-primary);
    }
    @media (prefers-color-scheme: dark) {
        textarea {
            background: var(--color-gray-800);
            border-color: var(--color-gray-600);
        }
    }
</style>
