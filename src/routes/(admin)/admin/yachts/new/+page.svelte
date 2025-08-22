<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";

    import { yachtSteps } from "$lib/components/admin/fields/yachts";
    import { yachtSchema } from "$lib/schemas/yachtSchema";
    import { createYacht, updateYacht } from "$lib/utils/yachtsActions";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "yacht";
    const steps = yachtSteps;
    const schema = yachtSchema;
    const createFn = createYacht;
    const updateFn = updateYacht;
    console.log("Excursion steps:", steps);
</script>

<UniversalForm {steps} {schema} {createFn} {updateFn} {mode} {type} />
