<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import { LIST_COLUMNS } from "$lib/constants/listAdminFields.js";
    import {
        deleteTransfer,
        duplicateTransfer,
        toggleTransferActive,
    } from "$lib/utils/transfersActions.js";

    export let data;
    let transfers = structuredClone(data.items);

    const columnMap = LIST_COLUMNS;
</script>

<AdminItemList
    type="transfers"
    {columnMap}
    items={transfers}
    onDelete={deleteTransfer}
    onDuplicate={duplicateTransfer}
    onToggleActive={toggleTransferActive}
/>
