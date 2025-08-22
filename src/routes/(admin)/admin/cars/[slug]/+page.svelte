<script>
    import { onMount } from "svelte";
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { carSteps } from "$lib/components/admin/fields/cars";
    import { carSchema } from "$lib/schemas/carSchema";
    import { getCar, updateCar } from "$lib/utils/carsActions";
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import { page } from "$app/stores";

    let isLoading = true;
    let error = "";
    let initialData = {};
    const type = "car";
    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { car, translation } = await getCar(slug);

            // Начинаем с копии car
            const data = { ...car };

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

    const steps = carSteps;
    const schema = carSchema;
    const createFn = null; // в режиме редактирования не используется
    const updateFn = updateCar;
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
