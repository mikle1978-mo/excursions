<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import { LIST_COLUMNS } from "$lib/constants/listAdminFields";
    import {
        deleteExcursion,
        duplicateExcursion,
        toggleExcursionActive,
    } from "$lib/utils/excursionsActions.js";

    export let data;
    let excursions = structuredClone(data.items);

    export let columnMap = LIST_COLUMNS;
</script>

<AdminItemList
    type="excursions"
    {columnMap}
    items={excursions}
    onDelete={deleteExcursion}
    onDuplicate={duplicateExcursion}
    onToggleActive={toggleExcursionActive}
/>
