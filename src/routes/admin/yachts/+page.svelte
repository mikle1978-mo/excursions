<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import {
        deleteYacht,
        duplicateYacht,
        toggleYachtActive,
    } from "$lib/utils/yachtsActions.js";

    export let data;
    let yachts = structuredClone(data.items);

    const columnMap = {
        slug: "Slug",
        title_ru: "Название (RU)",
        active: "Активна",
        price: "Цена",
    };
</script>

<AdminItemList
    type="yachts"
    {columnMap}
    items={yachts}
    onDelete={deleteYacht}
    onDuplicate={duplicateYacht}
    onToggleActive={toggleYachtActive}
/>
