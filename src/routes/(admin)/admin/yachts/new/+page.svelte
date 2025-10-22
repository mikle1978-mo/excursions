<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { yachtSteps } from "$lib/components/admin/fields/yachts";
    import { yachtSchema } from "$lib/schemas/yachtSchema";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "yachts";
    const steps = yachtSteps;
    const schema = yachtSchema;
</script>

<UniversalForm {steps} {schema} {mode} {type} />
