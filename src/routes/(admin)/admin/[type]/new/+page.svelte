<script>
    import UniversalForm from "$lib/admin/components/UniversalForm.svelte";
    export let data;

    const { type } = data;
    const mode = "create";
</script>

<UniversalForm {mode} {type} />
