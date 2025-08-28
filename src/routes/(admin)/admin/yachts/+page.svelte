<script>
    import AdminItemList from "$lib/components/admin/AdminItemList.svelte";
    import { LIST_COLUMNS } from "$lib/constants/listAdminFields";

    export let data;
    let items = structuredClone(data.items);

    export let columnMap = LIST_COLUMNS;
</script>

<AdminItemList type="yachts" {columnMap} {items} />
