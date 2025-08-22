<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";

    import { transferSteps } from "$lib/components/admin/fields/transfers";
    import { transferSchema } from "$lib/schemas/transferSchema";
    import {
        createTransfer,
        updateTransfer,
    } from "$lib/utils/transfersActions";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "transfer";
    const steps = transferSteps;
    const schema = transferSchema;
    const createFn = createTransfer;
    const updateFn = updateTransfer;
    console.log("Transfer steps:", steps);
</script>

<UniversalForm {steps} {schema} {createFn} {updateFn} {mode} {type} />
