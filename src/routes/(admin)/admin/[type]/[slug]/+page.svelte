<!-- admin/[type]/[slug] -->

<script>
    import UniversalForm from "$lib/admin/components/UniversalForm.svelte";
    import { page } from "$app/stores";

    $: type = $page.params.type;
    $: slug = $page.params.slug;
    export let data;

    const { item } = data.itemData;
    let isLoading = true;
    let error = "";

    const mode = "edit";

    $: if (item) {
        isLoading = false;
    }
</script>

{#if isLoading}
    <p>Загрузка данных...</p>
{:else if error}
    <p class="error">{error}</p>
{:else}
    <UniversalForm {mode} {item} {type} {slug} />
{/if}
