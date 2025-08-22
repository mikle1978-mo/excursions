<script>
    import { onMount } from "svelte";
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { transferSteps } from "$lib/components/admin/fields/transfers";
    import { transferSchema } from "$lib/schemas/transferSchema";
    import { getTransfer, updateTransfer } from "$lib/utils/transfersActions";
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import { page } from "$app/stores";

    let isLoading = true;
    let error = "";
    let initialData = {};
    const type = "transfer";
    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { item: transfer, translation } = await getTransfer(slug);

            // Начинаем с копии transfer
            const data = { ...transfer };

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

    const steps = transferSteps;
    const schema = transferSchema;
    const createFn = null; // в режиме редактирования не используется
    const updateFn = updateTransfer;
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
