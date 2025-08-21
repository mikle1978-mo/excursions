<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import {
        deleteExcursion,
        duplicateExcursion,
        toggleExcursionActive,
    } from "$lib/utils/excursionsActions.js";

    export let data;
    let excursions = structuredClone(data.items);

    const columnMap = {
        slug: "Slug",
        title_ru: "Название (RU)",
        active: "Активна",
        price: "Цена",
    };
</script>

<AdminItemList
    type="excursions"
    {columnMap}
    items={excursions}
    onDelete={deleteExcursion}
    onDuplicate={duplicateExcursion}
    onToggleActive={toggleExcursionActive}
/>
