<script>
    import { onMount } from "svelte";
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { blogSchema } from "$lib/schemas/blogSchemas";
    import { blogSteps } from "$lib/components/admin/fields/blogs";
    import { getItem } from "$lib/utils/itemsActions";
    import { page } from "$app/stores";

    const type = "blogs";
    const { slug } = $page.params;

    let isLoading = true;
    let error = "";
    let initialData = {};

    const steps = blogSteps;
    const schema = blogSchema;
    const mode = "edit";

    onMount(async () => {
        try {
            const response = await getItem(type, slug);
            if (!response?.item) {
                error = "Элемент не найден";
                return;
            }
            initialData = response.item;
        } catch (e) {
            console.error("Ошибка при загрузке статьи:", e);
            error = "Ошибка загрузки данных статьи";
        } finally {
            isLoading = false;
        }
    });
</script>

{#if isLoading}
    <p>Загрузка данных...</p>
{:else if error}
    <p class="error">{error}</p>
{:else}
    <UniversalForm {steps} {schema} {mode} {initialData} {slug} {type} />
{/if}
