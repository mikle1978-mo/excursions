<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import {
        deleteTransfer,
        duplicateTransfer,
        toggleTransferActive,
    } from "$lib/utils/transfersActions.js";

    export let data;
    let transfers = structuredClone(data.items);

    const columnMap = {
        slug: "Slug",
        title_ru: "Название (RU)",
        active: "Активна",
        price: "Цена",
    };
</script>

<AdminItemList
    type="transfers"
    {columnMap}
    items={transfers}
    onDelete={deleteTransfer}
    onDuplicate={duplicateTransfer}
    onToggleActive={toggleTransferActive}
/>
