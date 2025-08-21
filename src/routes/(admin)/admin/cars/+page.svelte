<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import {
        deleteCar,
        duplicateCar,
        toggleCarActive,
    } from "$lib/utils/carsActions.js";

    export let data;
    let cars = structuredClone(data.items);

    const columnMap = {
        slug: "Slug",
        title_ru: "Название (RU)",
        active: "Активна",
        price: "Цена",
    };
</script>

<AdminItemList
    type="cars"
    {columnMap}
    items={cars}
    onDelete={deleteCar}
    onDuplicate={duplicateCar}
    onToggleActive={toggleCarActive}
/>
