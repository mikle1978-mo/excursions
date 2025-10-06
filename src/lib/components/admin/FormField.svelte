<script>
    import PrimitiveField from "$lib/components/admin/PrimitiveField.svelte";
    import ObjectField from "$lib/components/admin/ObjectField.svelte";
    import ArrayField from "$lib/components/admin/ArrayField.svelte";

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
