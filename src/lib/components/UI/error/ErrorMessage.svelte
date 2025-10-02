<!-- ErrorMessage.svelte -->
<script>
    export let field;
    export let errors;

    function getError(errors, path) {
        if (!errors) return null;

        const keys = path.split(".");
        let target = errors;

        for (const key of keys) {
            if (!target) return null;

            if (target[key] !== undefined) {
                target = target[key];
            } else if (target.message) {
                // если пришёл объект { message: "..."} на верхнем уровне
                return target.message;
            } else {
                return null;
            }
        }

        return target?.message ?? null;
    }
</script>

{#if getError(errors, field)}
    <span class="error">{getError(errors, field)}</span>
{/if}

<style>
    .error {
        display: block;
        color: red;
        font-size: 0.875rem; /* 14px */
        margin-top: 0.25rem; /* 4px */
    }
</style>
