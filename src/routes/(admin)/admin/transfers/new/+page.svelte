<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { transferSteps } from "$lib/components/admin/fields/transfers";
    import { transferSchema } from "$lib/schemas/transferSchema";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "transfers";
    const steps = transferSteps;
    const schema = transferSchema;
</script>

<UniversalForm {steps} {schema} {mode} {type} />
