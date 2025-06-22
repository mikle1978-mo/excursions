<!-- ErrorMessage.svelte -->
<script>
    export let field;
    export let errors;
</script>

{#if errors[field]}
    <span class="error">{errors[field]}</span>
{/if}

<style>
    .error {
        color: red;
        font-size: 0.875rem; /* 14px */
        margin-top: 0.25rem; /* 4px */
    }
</style>
