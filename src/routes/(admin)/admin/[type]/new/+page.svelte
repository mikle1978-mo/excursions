<script>
    import UniversalForm from "$lib/admin/components/UniversalForm.svelte";
    import { page } from "$app/stores";

    $: type = $page.params.type;
    const mode = "create";
</script>

<UniversalForm {mode} {type} />
