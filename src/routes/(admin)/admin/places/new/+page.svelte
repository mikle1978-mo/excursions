<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { placeSteps } from "$lib/components/admin/fields/places";
    import { placeSchema } from "$lib/schemas/placeSchema";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "place";
    const steps = placeSteps;
    const schema = placeSchema;
    console.log("Place steps:", steps);
</script>

<UniversalForm {steps} {schema} {mode} {type} />
