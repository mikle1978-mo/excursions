<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";

    import { carSteps } from "$lib/components/admin/fields/cars";
    import { carSchema } from "$lib/schemas/carSchema";
    import { createCar, updateCar } from "$lib/utils/carsActions";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "car";
    const steps = carSteps;
    const schema = carSchema;
    const createFn = createCar;
    const updateFn = updateCar;
    console.log("Cars steps:", steps);
</script>

<UniversalForm {steps} {schema} {createFn} {updateFn} {mode} {type} />
