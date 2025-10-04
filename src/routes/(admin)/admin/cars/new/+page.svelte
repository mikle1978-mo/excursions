<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { carSteps } from "$lib/components/admin/fields/cars";
    import { carSchema } from "$lib/schemas/carSchema";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "cars";
    const steps = carSteps;
    const schema = carSchema;
    console.log("Cars steps:", steps);
</script>

<UniversalForm {steps} {schema} {mode} {type} />
