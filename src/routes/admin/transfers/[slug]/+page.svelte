<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import TransferForm from "$lib/components/admin/TransferForm.svelte";
    import { getTransfer } from "$lib/utils/transfersActions";
    import {
        setTransferForm,
        createInitialTransferForm,
    } from "$lib/stores/transferForm";

    let isLoading = true;
    let error = "";
    const { slug } = $page.params;

    onMount(async () => {
        try {
            const { transfer, translation } = await getTransfer(slug);

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

            setTransferForm({
                ...transfer,
                title: toLangMap("title"),
                description: toLangMap("description"),
                metaDescription: toLangMap("metaDescription"),
                servicesDetails: toLangArrayMap("servicesDetails"),
            });
        } catch (e) {
            console.error(e);
            error = "Ошибка загрузки данных трансфера";
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
    <TransferForm mode="edit" {slug} />
{/if}

<style>
    .error {
        color: red;
        font-weight: bold;
    }
</style>
