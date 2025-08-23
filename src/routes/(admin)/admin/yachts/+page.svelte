<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import { LIST_COLUMNS } from "$lib/constants/listAdminFields";
    import {
        deleteYacht,
        duplicateYacht,
        toggleYachtActive,
    } from "$lib/utils/yachtsActions.js";

    export let data;
    let yachts = structuredClone(data.items);

    const columnMap = LIST_COLUMNS;
</script>

<AdminItemList
    type="yachts"
    {columnMap}
    items={yachts}
    onDelete={deleteYacht}
    onDuplicate={duplicateYacht}
    onToggleActive={toggleYachtActive}
/>
