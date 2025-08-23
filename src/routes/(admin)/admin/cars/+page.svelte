<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import { LIST_COLUMNS } from "$lib/constants/listAdminFields.js";
    import {
        deleteCar,
        duplicateCar,
        toggleCarActive,
    } from "$lib/utils/carsActions.js";

    export let data;
    let cars = structuredClone(data.items);

    const columnMap = LIST_COLUMNS;
</script>

<AdminItemList
    type="cars"
    {columnMap}
    items={cars}
    onDelete={deleteCar}
    onDuplicate={duplicateCar}
    onToggleActive={toggleCarActive}
/>
