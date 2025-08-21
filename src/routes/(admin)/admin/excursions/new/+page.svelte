<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";

    import { excursionSteps } from "$lib/components/admin/fields/excursions";
    import { excursionSchema } from "$lib/schemas/excursionSchema";
    import {
        createExcursion,
        updateExcursion,
    } from "$lib/utils/excursionsActions";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "excursion";
    const steps = excursionSteps;
    const schema = excursionSchema;
    const createFn = createExcursion;
    const updateFn = updateExcursion;
    console.log("Excursion steps:", steps);
</script>

<UniversalForm {steps} {schema} {createFn} {updateFn} {mode} {type} />
