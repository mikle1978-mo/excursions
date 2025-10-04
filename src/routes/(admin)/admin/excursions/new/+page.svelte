<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";

    import { excursionSteps } from "$lib/components/admin/fields/excursions";
    import { excursionSchema } from "$lib/schemas/excursionSchema";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "excursions";
    const steps = excursionSteps;
    const schema = excursionSchema;

    console.log("Excursion steps:", steps);
</script>

<UniversalForm {steps} {schema} {mode} {type} />
