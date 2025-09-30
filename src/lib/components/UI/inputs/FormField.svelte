<script>
    import PrimitiveField from "$lib/components/UI/inputs/PrimitiveField.svelte";
    import ObjectField from "$lib/components/UI/inputs/ObjectField.svelte";
    import ArrayObjectsField from "$lib/components/UI/inputs/ArrayObjectsField.svelte";
    import ArrayField from "$lib/components/UI/inputs/ArrayField.svelte";

    export let field;
    export let value;
    export let errors = {};
    export let fieldName = "";

   
</script>

{#if field.type === "object"}
    <ObjectField {field} bind:value {errors} {fieldName} />
{:else if field.type === "arrayObjects"}
    <ArrayObjectsField {field} bind:value {errors} {fieldName} />
{:else if field.type === "array"}
    <ArrayField {field} bind:value {errors} {fieldName} />
{:else}
    <PrimitiveField {field} bind:value {errors} {fieldName} />
{/if}
