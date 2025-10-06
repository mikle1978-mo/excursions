<script>
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { blogSteps } from "$lib/components/admin/fields/blogs";
    import { blogSchema } from "$lib/schemas/blogSchemas";

    // В режиме создания slug не нужен
    const mode = "create";
    const type = "blog";
    const steps = blogSteps;
    const schema = blogSchema;
    console.log("Blog steps:", steps);
</script>

<UniversalForm {steps} {schema} {mode} {type} />
