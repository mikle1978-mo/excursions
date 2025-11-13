<script>
    import PrimitiveField from "$lib/admin/components/PrimitiveField.svelte";
    import ObjectField from "$lib/admin/components/ObjectField.svelte";
    import ArrayField from "$lib/admin/components/ArrayField.svelte";

    export let field;
    export let value;
    export let errors = {};
    export let fieldName = "";
</script>

{#if field.type === "object"}
    <ObjectField {field} bind:value {errors} {fieldName} />
{:else if field.type === "array"}
    <ArrayField {field} bind:value {errors} {fieldName} />
{:else}
    <PrimitiveField {field} bind:value {errors} {fieldName} />
{/if}
