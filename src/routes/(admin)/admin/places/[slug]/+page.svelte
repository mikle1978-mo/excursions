<script>
    import { onMount } from "svelte";
    import UniversalForm from "$lib/components/admin/UniversalForm.svelte";
    import { placeSteps } from "$lib/components/admin/fields/places";
    import { placeSchema } from "$lib/schemas/placeSchema";
    import { getItem } from "$lib/utils/itemsActions";
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import { page } from "$app/stores";

    let isLoading = true;
    let error = "";
    let initialData = {};
    const type = "places";

    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { item, translation } = await getItem(type, slug);

            // Начинаем с копии place
            const data = { ...item };

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
            // 🔹 Логируем данные перед установкой в форму
            console.log(
                "Data received from DB before initialData assignment:",
                data
            );
            initialData = data;
        } catch (e) {
            console.error(e);
            error = "Ошибка загрузки данных места";
        } finally {
            isLoading = false;
        }
    });

    const steps = placeSteps;
    const schema = placeSchema;
    const mode = "edit";
</script>

{#if isLoading}
    <p>Загрузка данных...</p>
{:else if error}
    <p class="error">{error}</p>
{:else}
    <UniversalForm {steps} {schema} {mode} {initialData} {slug} {type} />
{/if}
