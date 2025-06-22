<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import ExcursionForm from "$lib/components/admin/ExcursionForm.svelte";
    import { getExcursion } from "$lib/utils/excursionsActions";
    import {
        setExcursionForm,
        createInitialExcursionForm,
    } from "$lib/stores/excursionForm";

    let isLoading = true;
    let error = "";
    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { excursion, translation } = await getExcursion(slug);

            // Функция для заполнения языковых полей
            const toLangMap = (field, def = "") =>
                Object.fromEntries(
                    ["ru", "en", "tr"].map((lang) => [
                        lang,
                        translation.find((t) => t.lang === lang)?.[field] ??
                            def,
                    ])
                );

            const toLangArrayMap = (field) =>
                Object.fromEntries(
                    ["ru", "en", "tr"].map((lang) => [
                        lang,
                        translation.find((t) => t.lang === lang)?.[field] ?? [],
                    ])
                );

            setExcursionForm({
                ...excursion,
                title: toLangMap("title"),
                metaDescription: toLangMap("metaDescription"),
                description: toLangMap("description"),
                meetingPoint: toLangMap("meetingPoint"),
                whatYouSee: toLangArrayMap("whatYouSee"),
                includes: toLangArrayMap("includes"),
                whatToBring: toLangArrayMap("whatToBring"),
                tags: toLangArrayMap("tags"),
            });
        } catch (e) {
            console.error(e);
            error = "Ошибка загрузки данных яхты";
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
    <ExcursionForm mode="edit" {slug} />
{/if}

<style>
    .error {
        color: red;
        font-weight: bold;
    }
</style>
