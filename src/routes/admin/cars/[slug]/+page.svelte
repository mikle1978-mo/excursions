<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import CarForm from "$lib/components/admin/CarForm.svelte";
    import { getCar } from "$lib/utils/carsActions";
    import { setCarForm, createInitialCarForm } from "$lib/stores/carForm";

    let isLoading = true;
    let error = "";
    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { car, translation } = await getCar(slug);

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

            setCarForm({
                ...car,
                title: toLangMap("title"),
                metaDescription: toLangMap("metaDescription"),
                description: toLangMap("description"),
                fuelPolicy: toLangMap("fuelPolicy"),
                extraTimePolicy: toLangMap("extraTimePolicy"),
                insuranceDescription: toLangMap("insuranceDescription"),

                meetingPoint: toLangMap("meetingPoint"), // если нужно
                whatYouSee: toLangArrayMap("whatYouSee"), // если есть
                includes: toLangArrayMap("includes"),
                whatToBring: toLangArrayMap("whatToBring"),
                rentalConditions: toLangArrayMap("rentalConditions"),
                insuranceExclusions: toLangArrayMap("insuranceExclusions"),
                accidentInstructions: toLangArrayMap("accidentInstructions"),
                requiredDocuments: toLangArrayMap("requiredDocuments"),
                notes: toLangArrayMap("notes"),
                tags: toLangArrayMap("tags"),
            });
        } catch (e) {
            console.error(e);
            error = "Ошибка загрузки данных машины";
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
    <CarForm mode="edit" {slug} />
{/if}

<style>
    .error {
        color: red;
        font-weight: bold;
    }
</style>
