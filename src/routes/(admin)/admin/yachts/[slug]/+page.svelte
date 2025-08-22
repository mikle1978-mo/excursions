<script>
    import { onMount } from "svelte";
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { yachtSteps } from "$lib/components/admin/fields/yachts";
    import { yachtSchema } from "$lib/schemas/yachtSchema";
    import { getYacht, updateYacht } from "$lib/utils/yachtsActions";
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import { page } from "$app/stores";

    let isLoading = true;
    let error = "";
    let initialData = {};
    const type = "yacht";
    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { yacht, translation } = await getYacht(slug);

            // Начинаем с копии yacht
            const data = { ...yacht };

            // Для каждого ключа из перевода собираем структуру { en: value, ru: value }
            const localizedFields = Object.keys(translation[0]).filter(
                (key) => key !== "lang" && key !== "_id" && key !== "itemSlug"
            );

            for (const field of localizedFields) {
                data[field] = Object.fromEntries(
                    SUPPORTED_LANGUAGES.map((lang) => [
                        lang,
                        translation.find((t) => t.lang === lang)?.[field] ?? "",
                    ])
                );
            }

            initialData = data;
        } catch (e) {
            console.error(e);
            error = "Ошибка загрузки данных экскурсии";
        } finally {
            isLoading = false;
        }
    });

    const steps = yachtSteps;
    const schema = yachtSchema;
    const createFn = null; // в режиме редактирования не используется
    const updateFn = updateYacht;
    const mode = "edit";
</script>

{#if isLoading}
    <p>Загрузка данных...</p>
{:else if error}
    <p class="error">{error}</p>
{:else}
    <UniversalForm
        {steps}
        {schema}
        {createFn}
        {updateFn}
        {mode}
        {initialData}
        {slug}
        {type}
    />
{/if}
